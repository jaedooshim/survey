import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateGuest {
  @Field()
  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[가-힣]/)
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: '전화번호를 "-" 포함하여 입력해주세요.' })
  @MaxLength(13)
  @Matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
  tel: string;

  @Field()
  @IsNotEmpty()
  surveyId: number;
}
