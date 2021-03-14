import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { ModeWaitlistResolver } from './mode-waitlist.resolver';
import { ModeWaitlistProcessor } from './mode-waitlist.processor';
import { ModeWaitlistService } from './mode-waitlist.service';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'modeWaitlist',
    }),
  ],
  providers: [ModeWaitlistService, ModeWaitlistResolver, ModeWaitlistProcessor],
  exports: [ModeWaitlistService],
})
export class ModeWaitlistModule {}
