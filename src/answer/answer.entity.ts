import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { Guest } from '../guest/guest.entity';
import { Question } from '../question/question.entity';
import { Select } from '../select/select.entity';

@ObjectType()
@Entity()
export class Answer {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.guests)
  survey: Survey;

  @Field(() => Guest)
  @ManyToOne(() => Guest, (guest) => guest.answers)
  guest: Guest;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Field(() => Select)
  @ManyToOne(() => Select, (select) => select.answers)
  select: Select;
}
