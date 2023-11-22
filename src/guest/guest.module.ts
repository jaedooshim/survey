import { Module } from '@nestjs/common';
import { GuestResolver } from './guest.resolver';
import { GuestService } from './guest.service';

@Module({
  providers: [GuestResolver, GuestService]
})
export class GuestModule {}
