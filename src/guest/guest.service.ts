import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { Repository } from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { CreateGuest } from './guest.dto';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  /* 설문자 등록 */
  async createGuest(GuestData: CreateGuest): Promise<Guest> {
    try {
      const { name, tel, surveyId } = GuestData;
      const survey = await this.surveyRepository.findOne({ where: { id: surveyId } });
      if (!survey) {
        throw new ApolloError('존재하지 않는 설문지 ID입니다.');
      }
      const guest = this.guestRepository.create({
        name,
        tel,
        survey,
      });
      return this.guestRepository.save(guest);
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문자 등록에 실패하였습니다.': err.message });
    }
  }

  /* 설문자 전체조회 */
  async findAllGuest(): Promise<Guest[]> {
    try {
      return this.guestRepository.find();
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문자 전체 조회에 실패하였습니다.': err.message });
    }
  }

  /* 설문지 ID별 설문자 조회 */
  async findGuestBySurveyId(surveyId: number): Promise<Guest[]> {
    try {
      return await this.guestRepository.find({ where: { survey: { id: surveyId } } });
    } catch (err) {
      throw new ApolloError(err.message, '500', { '설문지 ID별 설문자 조회에 실패하였습니다.': err.message });
    }
  }
}
