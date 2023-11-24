import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

/* 설문지 생성 DTO */
@InputType()
export class CreateSurvey {
  @Field()
  @IsNotEmpty({ message: '설문지 제목을 작성해주세요.' })
  title: string;

  @Field()
  @IsNotEmpty({ message: '설문지 설명란을 작성해주세요.' })
  description: string;
}

/* 설문지 수정 DTO */
@InputType()
export class UpdateSurvey {
  @Field(() => Int)
  @IsInt({ message: '아이디는 숫자여야 합니다.' })
  @IsDefined({ message: '아이디를 입력해주세요.' })
  id: number;

  @Field({ nullable: true })
  @IsNotEmpty({ message: '설문지 제목을 작성해주세요.' })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: '설문지 설명란을 작성해주세요.' })
  @IsOptional()
  description?: string;
}
