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
import { Survey } from '../survey/survey.entity';
import { Select } from '../select/select.entity';
import { Answer } from '../answer/answer.entity';

@ObjectType()
@Entity()
export class Question {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'int' })
  question_number: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  question_text: string;

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

  @Field(() => [Select])
  @OneToMany(() => Select, (select) => select.question)
  selects: Select[];

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
