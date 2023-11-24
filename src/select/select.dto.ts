import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
/* 선택지 생성 DTO */
@InputType()
export class CreateSelect {
  @Field()
  @IsNotEmpty({ message: '선택지 번호를 입력해주세요.' })
  @IsNumber()
  select_number: number;

  @Field()
  @IsNotEmpty({ message: '선택지 설명을 입력해주세요.' })
  select_text: string;

  @Field()
  @IsNumber()
  score: number;
}

/* 선택지 수정 DTO */
@InputType()
export class UpdateSelect {
  @Field(() => Int)
  @IsInt({ message: '아이디는 숫자형식 입니다.' })
  @IsDefined({ message: '아이디를 입력해주세요.' })
  id: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty({ message: '선택지 번호를 작성해주세요.' })
  select_number: number;

  @Field({ nullable: true })
  @IsNotEmpty({ message: '선택지를 입력해주세요.' })
  @IsString()
  select_text: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: '점수를 입력해주세요.' })
  @IsNumber()
  score: number;
}
