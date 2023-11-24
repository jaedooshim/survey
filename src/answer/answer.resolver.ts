import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswer, UpdateAnswer } from './answer.dto';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  /* 답변 생성 */
  @Mutation(() => [Answer])
  async createAnswer(@Args('createAnswerInput') createAnswer: CreateAnswer): Promise<Answer[]> {
    return await this.answerService.createAnswer(createAnswer);
  }

  /* 설문자 ID별 답변조회 */
  @Query(() => [Answer])
  async findAnswerByGuestId(@Args('guestId', { type: () => Int }) guestId: number): Promise<Answer[]> {
    return await this.answerService.findAnswerByGuestId(guestId);
  }

  /* 설문지 ID별 답변조회 */
  @Query(() => [Answer])
  async findAnswerBySurveyId(@Args('surveyId', { type: () => Int }) surveyId: number): Promise<Answer[]> {
    return await this.answerService.findAnswerBySurveyId(surveyId);
  }

  /* 답변 ID별 조회 */
  @Query(() => Answer)
  async findAnswerById(@Args('answerId', { type: () => Int }) answerId: number): Promise<Answer> {
    return await this.answerService.findAnswerById(answerId);
  }

  /* 답변 수정 */
  @Mutation(() => Answer)
  async updateAnswer(@Args('updateInput') update: UpdateAnswer): Promise<Answer> {
    return this.answerService.updateAnswer(update);
  }

  /* 답변 삭제 */
  @Mutation(() => Boolean)
  async deleteAnswer(@Args('deleteId', { type: () => Int }) deleteId: number): Promise<boolean> {
    return this.answerService.deleteAnswer(deleteId);
  }
}
