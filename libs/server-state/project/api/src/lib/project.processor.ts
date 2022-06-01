import { PrismaService } from '@dream/server-state/prisma';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Processor('project')
export class ProjectProcessor {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Process('cleanup')
  async handleCleanup() {
    const uselessStates = await this.prisma.projectState.findMany({
      where: { deleted: false },
      orderBy: { createdAt: 'desc' },
      skip: 50,
      take: 500,
    });

    await this.prisma.projectState.deleteMany({
      where: { id: { in: uselessStates.map((s) => s.id) } },
    });
  }

  @Process('incrementCount')
  async incrementCount(job: Job) {
    const projectId = job.data?.projectId;

    const state = await this.prisma.projectState.findFirst({
      where: { projectId },
      include: { dates: true },
      orderBy: { createdAt: 'desc' },
    });

    const prevCount = state?.count || 0;

    const newState = await this.prisma.projectState.create({
      data: {
        projectId,
        count: prevCount + 1,
        dates: {
          createMany: {
            data: [
              ...state.dates.map(({ date }) => ({ date })),
              { date: `${Date.now()}` },
            ],
          },
        },
      },
    });

    this.pubsub.publish('projectStateUpdated', {
      projectId,
      projectStateUpdated: newState.id,
    });

    return true;
  }

  @OnQueueError()
  handler(error: Error) {
    console.log(error);
  }
}
