import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';
import { CreateSurvey, UpdateSurvey } from './survey.dto';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  /* 설문지 생성 */
  async createSurvey(createSurveyDto: CreateSurvey): Promise<Survey> {
    try {
      const newSurvey = this.surveyRepository.create(createSurveyDto);
      return this.surveyRepository.save(newSurvey);
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 생성에 실패하였습니다.': err.message });
    }
  }

  /* 설문지 전체 조회 */
  async findAllSurvey(): Promise<Survey[]> {
    try {
      return this.surveyRepository.find();
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 전체 조회에 실패했습니다.': err.message });
    }
  }

  /* 설문지 ID별 조회 */
  async findBySurveyId(surveyId: number): Promise<Survey> {
    try {
      const existingSurvey = await this.surveyRepository.findOne({ where: { id: surveyId } });
      if (!existingSurvey) throw new ApolloError('해당하는 설문지를 찾지 못했습니다.');
      return existingSurvey;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 ID별 조회에 실패했습니다.': err.message });
    }
  }

  /* 설문지 수정 */
  async updateSurvey(update: UpdateSurvey): Promise<Survey> {
    try {
      const existingSurvey = await this.surveyRepository.findOne({ where: { id: update.id } });
      if (!existingSurvey) throw new ApolloError('수정실패:해당하는 설문지를 찾지 못했습니다.');
      existingSurvey.title = update.title || existingSurvey.title;
      existingSurvey.description = update.description || existingSurvey.description;
      return this.surveyRepository.save(existingSurvey);
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 수정을 실패했습니다.': err.message });
    }
  }

  /* 설문지 삭제 */
  async deleteSurvey(surveyId: number): Promise<boolean> {
    try {
      const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
      if (!survey) {
        throw new ApolloError('삭제실패:해당하는 설문지를 찾지 못했습니다.');
      }
      await this.surveyRepository.softDelete(survey.id);
      return true;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 삭제에 실패했습니다.': err.message });
    }
  }
}
