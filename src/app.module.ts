import { Module } from '@nestjs/common';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { SelectModule } from './select/select.module';
import { AnswerModule } from './answer/answer.module';
import { GuestModule } from './guest/guest.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './_common/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    SurveyModule,
    QuestionModule,
    SelectModule,
    AnswerModule,
    GuestModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    GraphQLModule.forRoot({ autoSchemaFile: './src/schema.gql' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
