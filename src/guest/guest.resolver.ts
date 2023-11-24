import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Guest } from './guest.entity';
import { GuestService } from './guest.service';
import { CreateGuest } from './guest.dto';

@Resolver(() => Guest)
export class GuestResolver {
  constructor(private readonly guestService: GuestService) {}

  /* 설문자 등록 */
  @Mutation(() => Guest)
  async createGuest(@Args('createGuestInput') createGuestDto: CreateGuest): Promise<Guest> {
    return await this.guestService.createGuest(createGuestDto);
  }

  /* 설문자 전체조회 */
  @Query(() => [Guest])
  async findAllGuest(): Promise<Guest[]> {
    return await this.guestService.findAllGuest();
  }

  /* 설문지 ID별 설문자 조회 */
  @Query(() => [Guest])
  async findGuestBySurveyId(@Args('surveyId') surveyId: number): Promise<Guest[]> {
    return await this.guestService.findGuestBySurveyId(surveyId);
  }
}
