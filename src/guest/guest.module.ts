import { Module } from '@nestjs/common';
import { GuestResolver } from './guest.resolver';
import { GuestService } from './guest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from '../survey/survey.entity';
import { Guest } from './guest.entity';
import { Answer } from '../answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Guest, Answer])],
  providers: [GuestResolver, GuestService],
  exports: [GuestService],
})
export class GuestModule {}
