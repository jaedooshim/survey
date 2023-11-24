import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { CreateQuestion, UpdateQuestion } from './question.dto';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  /* 문항 생성 */
  @Mutation(() => Question)
  async createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestion): Promise<Question> {
    return this.questionService.createQuestion(createQuestionInput);
  }

  /* 문항 전체조회 */
  @Query(() => [Question])
  async findQuestion(): Promise<Question[]> {
    return await this.questionService.findQuestion();
  }

  /* 설문지 ID별 문항 전체조회 */
  @Query(() => [Question])
  async findQuestionBySurveyId(@Args('surveyId') surveyId: number): Promise<Question[]> {
    return await this.questionService.findQuestionBySurveyId(surveyId);
  }

  /* 문항 ID별 조회 */
  @Query(() => Question)
  async findByQuestionId(@Args('questionId') questionId: number): Promise<Question> {
    return await this.questionService.findByQuestionId(questionId);
  }

  /* 문항 수정 */
  @Mutation(() => Question)
  async updateQuestion(@Args('updateQuestion') update: UpdateQuestion): Promise<Question> {
    return await this.questionService.updateQuestion(update);
  }

  /* 문항 삭제 */
  @Mutation(() => Boolean)
  async deleteQuestion(@Args('questionId') questionId: number): Promise<boolean> {
    return await this.questionService.deleteQuestion(questionId);
  }
}
