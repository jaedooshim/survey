import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswer, UpdateAnswer } from './answer.dto';
import { Survey } from '../survey/survey.entity';
import { Guest } from '../guest/guest.entity';
import { Question } from '../question/question.entity';
import { Select } from '../select/select.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Select)
    private selectRepository: Repository<Select>,
  ) {}

  /* 답변 생성 */
  async createAnswer(createAnswerInput: CreateAnswer): Promise<Answer[]> {
    const { surveyId, guestId, questionSelects } = createAnswerInput;

    const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
    const guest = await this.guestRepository.findOne({ where: { id: guestId } });

    // 총점
    let totalScore = 0;
    const answers = [];

    for (const qs of questionSelects) {
      const question = await this.questionRepository.findOne({ where: { id: qs.questionId } });
      const select = await this.selectRepository.findOne({ where: { id: qs.selectId } });
      // 선택지의 점수를 총점에 더 함
      totalScore += select.score;

      const answer = this.answerRepository.create({
        survey,
        guest,
        question,
        select,
      });
      answers.push(await this.answerRepository.save(answer));
    }
    guest.totalScore = totalScore;
    await this.guestRepository.save(guest);
    return answers;
  }

  /* 설문자 ID별 답변조회 */
  async findAnswerByGuestId(guestId: number): Promise<Answer[]> {
    try {
      const guest = await this.guestRepository.findOne({ where: { id: guestId } });
      if (!guest) throw new ApolloError('해당하는 설문자가 존재하지 않습니다.');

      const answer = await this.answerRepository.find({
        where: { guest: { id: guestId } },
        relations: ['guest', 'survey', 'question', 'select'],
      });
      return answer;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '답변 설문자 ID별 조회에 실패하였습니다.': err.message });
    }
  }

  /* 설문지 ID별 답변조회 */
  async findAnswerBySurveyId(surveyId: number): Promise<Answer[]> {
    try {
      const answer = await this.answerRepository.find({
        where: { survey: { id: surveyId } },
        relations: ['guest', 'survey', 'question', 'select'],
      });
      if (!answer) throw new ApolloError('해당하는 설문지가 존재하지 않습니다.');
      return answer;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 ID별 답변조회에 실패하였습니다.': err.message });
    }
  }

  /* 답변 ID별 조회 */
  async findAnswerById(answerId: number): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOne({
        where: { id: answerId },
        relations: ['guest', 'survey', 'question', 'select'],
      });
      if (!answer) throw new ApolloError('해당 하는 답변이 존재하지 않습니다.');
      return answer;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '답변 ID별 조회에 실패하였습니다.': err.message });
    }
  }

  /* 답변 수정 */
  async updateAnswer(update: UpdateAnswer): Promise<Answer> {
    const { id, surveyId, guestId, questionId, selectId } = update;

    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) {
      throw new ApolloError('해당하는 답변이 존재하지 않습니다.');
    }

    const oldScore = answer.select.score;

    if (surveyId) {
      const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
      if (!survey) {
        throw new ApolloError('해당하는 설문이 존재하지 않습니다.');
      }
      answer.survey = survey;
    }

    if (guestId) {
      const guest = await this.guestRepository.findOne({ where: { id: guestId } });
      if (!guest) {
        throw new ApolloError('해당하는 설문자가 존재하지 않습니다.');
      }
      answer.guest = guest;
    }

    if (questionId) {
      const question = await this.questionRepository.findOne({ where: { id: questionId } });
      if (!question) {
        throw new ApolloError('해당하는 문항이 존재하지 않습니다.');
      }
      answer.question = question;
    }

    if (selectId) {
      const select = await this.selectRepository.findOne({ where: { id: selectId } });
      if (!select) {
        throw new ApolloError('해당하는 선택지가 존재하지 않습니다.');
      }
      answer.select = select;
    }

    const newScore = answer.select.score;

    // Guest의 총점 업데이트(기존 점수 빼고 새 점수를 더 함)
    answer.guest.totalScore = answer.guest.totalScore - oldScore + newScore;
    await this.guestRepository.save(answer.guest);

    const updatedAnswer = await this.answerRepository.save(answer);
    return updatedAnswer;
  }

  /* 답변 삭제 */
  async deleteAnswer(deleteId: number): Promise<boolean> {
    try {
      const answer = await this.answerRepository.findOne({ where: { id: deleteId } });
      if (!answer) {
        throw new ApolloError('삭제실패:해당하는 답변을 찾지 못했습니다.');
      }
      await this.answerRepository.softDelete(answer.id);
      return true;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '답변 삭제에 실패하였습니다.': err.message });
    }
  }
}
