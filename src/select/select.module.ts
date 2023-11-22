import { Module } from '@nestjs/common';
import { SelectResolver } from './select.resolver';
import { SelectService } from './select.service';

@Module({
  providers: [SelectResolver, SelectService]
})
export class SelectModule {}
