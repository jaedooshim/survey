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
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    SurveyModule,
    QuestionModule,
    SelectModule,
    AnswerModule,
    GuestModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './src/schema.gql',
      driver: ApolloDriver,
      formatError: (error) => {
        console.log(error);
        return error;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
