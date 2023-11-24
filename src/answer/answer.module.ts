import { Module } from '@nestjs/common';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Survey } from '../survey/survey.entity';
import { Question } from '../question/question.entity';
import { Guest } from '../guest/guest.entity';
import { Select } from '../select/select.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Survey, Question, Guest, Select])],
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
