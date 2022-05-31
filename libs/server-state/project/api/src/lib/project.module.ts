import { PrismaModule } from '@dream/server-state/prisma';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';
import { ProjectProcessor } from './project.processor';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'project',
    }),
  ],
  providers: [ProjectResolver, ProjectProcessor],
  exports: [],
})
export class ProjectModule implements OnApplicationBootstrap {
  constructor(@InjectQueue('project') private readonly projectQueue: Queue) {}

  onApplicationBootstrap() {
    this.projectQueue.add('cleanup', null, { repeat: { every: 4e3 } });
  }
}
