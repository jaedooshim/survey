import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/* 답변 생성 DTO */
@InputType()
export class CreateAnswer {
  @Field()
  @IsNotEmpty({ message: '설문 ID는 필수로 작성해주세요.' })
  surveyId: number;

  @Field()
  @IsNotEmpty({ message: '설문자 ID는 필수로 작성해주세요.' })
  guestId: number;

  @Field(() => [QuestionSelect])
  @IsNotEmpty({ message: '질문 선택지는 비어 있을 수 없습니다.' })
  questionSelects: QuestionSelect[];
}

/* 객체로 묶어서 questionSelects에 사용 */
@InputType()
export class QuestionSelect {
  @Field()
  @IsNotEmpty({ message: '항목 ID는 필수로 작성해주세요.' })
  questionId: number;

  @Field()
  @IsNotEmpty({ message: '선택지 ID는 필수로 작성해주세요.' })
  selectId: number;
}

/* 답변 수정 DTO */
@InputType()
export class UpdateAnswer {
  @Field({ nullable: true })
  @IsNotEmpty()
  surveyId: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  guestId: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  questionId: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  selectId: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  id: number;
}
