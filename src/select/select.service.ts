import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Select } from './select.entity';
import { Repository } from 'typeorm';
import { CreateSelect, UpdateSelect } from './select.dto';
import { Question } from '../question/question.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SelectService {
  constructor(
    @InjectRepository(Select)
    private readonly selectRepository: Repository<Select>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  /* 선택지 생성 */
  async createSelect(createSelectDto: CreateSelect, questionId: number): Promise<Select> {
    try {
      const question = await this.questionRepository.findOne({ where: { id: questionId } });
      if (!question) throw new ApolloError('해당하는 문항을 찾지 못했습니다.');

      const newSelect = this.selectRepository.create({
        select_number: createSelectDto.select_number,
        select_text: createSelectDto.select_text,
        score: createSelectDto.score,
        question,
      });
      return await this.selectRepository.save(newSelect);
    } catch (err) {
      throw new ApolloError(err.message, '500', { '선택지 생성에 실패하였습니다.': err.message });
    }
  }

  /* 선택지 전체조회 */
  async findSelect(): Promise<Select[]> {
    try {
      return await this.selectRepository.find({ relations: ['question'] });
    } catch (err) {
      throw new ApolloError(err.message, '500', { '선택지 전체조회에 실패하였습니다.': err.message });
    }
  }

  /* 문항 ID별 선택지 전체조회 */
  async findSelectByQuestionId(questionId: number): Promise<Select[]> {
    try {
      const question = await this.questionRepository.findOne({ where: { id: questionId } });
      if (!question) throw new ApolloError('해당하는 문항이 존재하지 않습니다.');

      const select = await this.selectRepository.find({
        where: { question: { id: questionId } },
        relations: ['question'],
      });
      return select;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '문항 ID별로 선택지를 조회하는데 실패하였습니다.': err.message });
    }
  }

  /* 선택지 ID별 조회 */
  async findBySelectId(selectId: number): Promise<Select> {
    try {
      const existingSelect = await this.selectRepository.findOne({ where: { id: selectId } });
      if (!existingSelect) throw new ApolloError('해당하는 선택지가 존재하지 않습니다.');
      return existingSelect;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '선택지 ID별 조회에 실패하였습니다.': err.message });
    }
  }

  /* 선택지 수정 */
  async updateSelect(update: UpdateSelect): Promise<Select> {
    try {
      const existingSelect = await this.selectRepository.findOne({ where: { id: update.id } });
      if (!existingSelect) throw new ApolloError('수정실패:해당하는 선택지가 존재하지 않습니다.');
      existingSelect.select_number = update.select_number || existingSelect.select_number;
      existingSelect.select_text = update.select_text || existingSelect.select_text;
      existingSelect.score = update.score || existingSelect.score;
      return await this.selectRepository.save(existingSelect);
    } catch (err) {
      console.log(err);
      throw new ApolloError(err.message, '500', { '선택지 수정을 실패했습니다.': err.message });
    }
  }

  /* 선택지 삭제 */
  async deleteSelect(selectId: number): Promise<boolean> {
    try {
      const select = await this.selectRepository.findOne({ where: { id: selectId } });
      if (!select) {
        throw new ApolloError('삭제실패:해당하는 선택지를 찾지 못했습니다.');
      }
      await this.selectRepository.softDelete(select.id);
      return true;
    } catch (err) {
      throw new ApolloError(err.message, '500', { '선택지 삭제에 실패하였습니다,': err.message });
    }
  }
}
