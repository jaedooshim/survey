import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { SurveyModule } from '../survey/survey.module';
import { Survey } from '../survey/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Survey]), SurveyModule],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
