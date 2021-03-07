import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { PrismaModule } from '@dream/prisma';
import { ModeWaitlistResolver } from './mode-waitlist.resolver';
import { ModeWaitlistProcessor } from './mode-waitlist.processor';
import { ModeWaitlistService } from './mode-waitlist.service';
import { Queue } from 'bull';

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
export class ModeWaitlistModule implements OnApplicationBootstrap {
  constructor(
    @InjectQueue('modeWaitlist') private readonly modeWaitlistQueue: Queue
  ) {}

  onApplicationBootstrap() {
    // this.modeWaitlistQueue.add('cleanup', null, { repeat: { every: 4e3 } });
  }
}
