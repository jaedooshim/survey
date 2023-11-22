import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

@ObjectType()
@Entity()
export class Select {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'int' })
  select_number: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  select_text: string;

  @Field()
  @Column({ type: 'int' })
  score: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.selects)
  question: Question;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.select)
  answers: Answer[];
}
