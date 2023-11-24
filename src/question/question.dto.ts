import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* 문항 생성 DTO */
@InputType()
export class CreateQuestion {
  @Field()
  @IsNotEmpty({ message: '문항번호는 숫자로만 가능합니다.' })
  @IsNumber()
  question_number: number;

  @Field()
  @IsNotEmpty({ message: '문항을 작성해주세요.' })
  @IsString()
  question_text: string;

  @Field()
  @IsNotEmpty({ message: '설문 ID는 필수로 작성해주세요.' })
  @IsNumber()
  surveyId: number;
}

/* 문항 수정 DTO */
@InputType()
export class UpdateQuestion {
  @Field(() => Int)
  @IsInt({ message: '아이디는 숫자형식 입니다.' })
  @IsDefined({ message: '아이디를 입력해주세요.' })
  id: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty({ message: '문항 번호를 작성해주세요.' })
  question_number: number;

  @Field({ nullable: true })
  @IsNotEmpty({ message: '문항을 입력해주세요.' })
  @IsString()
  question_text: string;
}
