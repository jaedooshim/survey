import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';
import { CreateSurvey, UpdateSurvey } from './survey.dto';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  /* 설문지 생성 */
  @Mutation(() => Survey)
  async createSurvey(@Args('newSurvey') newSurvey: CreateSurvey): Promise<Survey> {
    return this.surveyService.createSurvey(newSurvey);
  }

  /* 설문지 전체 조회 */
  @Query(() => [Survey])
  async findAllSurvey(): Promise<Survey[]> {
    return this.surveyService.findAllSurvey();
  }

  /* 설문지 ID별 조회 */
  @Query(() => Survey)
  async findBySurveyId(@Args('surveyId', { type: () => Int }) surveyId: number): Promise<Survey> {
    return this.surveyService.findBySurveyId(surveyId);
  }

  /* 설문지 수정 */
  @Mutation(() => Survey)
  async updateSurvey(@Args('updateSurvey') updateSurvey: UpdateSurvey): Promise<Survey> {
    return this.surveyService.updateSurvey(updateSurvey);
  }

  /* 설문지 삭제 */
  @Mutation(() => Boolean)
  async deleteSurvey(@Args('surveyId') surveyId: number): Promise<boolean> {
    return await this.surveyService.deleteSurvey(surveyId);
  }
}
