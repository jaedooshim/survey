import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { SurveyService } from '../survey/survey.service';
import { CreateQuestion, UpdateQuestion } from './question.dto';
import { ApolloError } from 'apollo-server-express';
import { Survey } from '../survey/survey.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly surveyService: SurveyService,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  /* 문항 생성 */
  async createQuestion(createQuestionDto: CreateQuestion): Promise<Question> {
    try {
      const survey = await this.surveyService.findBySurveyId(createQuestionDto.surveyId);
      if (!survey) throw new ApolloError('해당하는 설문지를 찾지 못했습니다.');

      const newQuestion = this.questionRepository.create({
        question_number: createQuestionDto.question_number,
        question_text: createQuestionDto.question_text,
        survey,
      });
      return this.questionRepository.save(newQuestion);
    } catch (err) {
      throw new ApolloError(err.message, '문항 생성에 실패하였습니다.');
    }
  }

  /* 문항 전체조회 */
  async findQuestion(): Promise<Question[]> {
    try {
      return this.questionRepository.find({ relations: ['survey'] });
    } catch (err) {
      throw new ApolloError(err.message, '500', { '문항 전체조회에 실패하였습니다.': err.message });
    }
  }

  /* 설문지 ID별 문항 전체조회 */
  async findQuestionBySurveyId(surveyId: number): Promise<Question[]> {
    try {
      const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
      if (!survey) throw new ApolloError('해당하는 설문지가 존재하지 않습니다.');

      const question = await this.questionRepository.find({
        where: { survey: { id: surveyId } },
        relations: ['survey'],
      });
      return question;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지ID별로 문항을 조회하는데 실패하였습니다.': err.message });
    }
  }

  /* 문항 ID별 조회 */
  async findByQuestionId(questionId: number): Promise<Question> {
    try {
      const existinsQuestion = await this.questionRepository.findOne({ where: { id: questionId } });
      if (!existinsQuestion) throw new ApolloError('해당하는 문항이 존재하지 않습니다.');
      return existinsQuestion;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '문항 ID별 조회에 실패하였습니다.': err.message });
    }
  }

  /* 문항 수정 */
  async updateQuestion(update: UpdateQuestion): Promise<Question> {
    try {
      const existingQuestion = await this.questionRepository.findOne({ where: { id: update.id } });
      if (!existingQuestion) throw new ApolloError('수정실패:해당하는 문항이 존재하지 않습니다.');
      existingQuestion.question_number = update.question_number || existingQuestion.question_number;
      existingQuestion.question_text = update.question_text || existingQuestion.question_text;
      return this.questionRepository.save(existingQuestion);
    } catch (err) {
      throw new ApolloError(err.message, '500', { '문항 수정을 실패했습니다.': err.message });
    }
  }

  /* 문항 삭제 */
  async deleteQuestion(questionId: number): Promise<boolean> {
    try {
      const question = await this.questionRepository.findOne({ where: { id: questionId } });
      if (!question) {
        throw new ApolloError('삭제실패:해당하는 문항을 찾지 못했습니다.');
      }
      await this.questionRepository.softDelete(question.id);
      return true;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '문항 삭제에 실패했습니다.': err.message });
    }
  }
}
