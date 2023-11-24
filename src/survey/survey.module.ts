import { Module } from '@nestjs/common';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyResolver, SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
