import { Module } from '@nestjs/common';
import { SelectResolver } from './select.resolver';
import { SelectService } from './select.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/question.entity';
import { Select } from './select.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Select])],
  providers: [SelectResolver, SelectService],
})
export class SelectModule {}
