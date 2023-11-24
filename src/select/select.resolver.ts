import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Select } from './select.entity';
import { SelectService } from './select.service';
import { CreateSelect, UpdateSelect } from './select.dto';

@Resolver(() => Select)
export class SelectResolver {
  constructor(private readonly selectService: SelectService) {}

  /* 선택지 생성 */
  @Mutation(() => Select)
  async createSelect(
    @Args('createSelectInput') createSelectInput: CreateSelect,
    @Args('questionId') questionId: number,
  ): Promise<Select> {
    return await this.selectService.createSelect(createSelectInput, questionId);
  }

  /* 선택지 전체조회 */
  @Query(() => [Select])
  async findSelect(): Promise<Select[]> {
    return await this.selectService.findSelect();
  }

  /* 문항 ID별 선택지 전체조회 */
  @Query(() => [Select])
  async findSelectByQuestionId(@Args('questionId') questionId: number): Promise<Select[]> {
    return await this.selectService.findSelectByQuestionId(questionId);
  }

  /* 선텍지 ID별 조회 */
  @Query(() => Select)
  async findBySelectId(@Args('selectId') selectId: number): Promise<Select> {
    return await this.selectService.findBySelectId(selectId);
  }

  /* 선택지 수정 */
  @Mutation(() => Select)
  async updateSelect(@Args('updateSelect') update: UpdateSelect): Promise<Select> {
    return await this.selectService.updateSelect(update);
  }

  /* 선택지 삭제 */
  @Mutation(() => Boolean)
  async deleteSelect(@Args('selectId') selectId: number): Promise<boolean> {
    return await this.selectService.deleteSelect(selectId);
  }
}
