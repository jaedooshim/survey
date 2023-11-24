import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guest } from '../guest/guest.entity';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

@ObjectType()
@Entity()
export class Survey {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Field(() => [Guest])
  @OneToMany(() => Guest, (guest) => guest.survey)
  guests: Guest[];

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.survey)
  answers: Answer[];
}
