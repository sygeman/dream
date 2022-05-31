import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/server-state/prisma';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';
import { Project } from './models/project.model';
import { ProjectState } from './models/project-state';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @ResolveField()
  async stateId(@Parent() project: Project) {
    const state = await this.prisma.projectState.findFirst({
      where: { projectId: project?.id },
      orderBy: { createdAt: 'desc' },
    });
    return state?.id;
  }

  @Query(() => Project)
  async project(
    @Args({ name: 'id', type: () => String })
    id: string,
    @Context('userId') userId: string
  ) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    return project;
  }

  @Query(() => [Project])
  async projects(@Context('userId') userId: string) {
    const projects = await this.prisma.project.findMany();
    return projects;
  }

  @Query(() => ProjectState)
  async projectState(
    @Args({ name: 'id', type: () => String })
    id: string,
    @Context('userId') userId: string
  ) {
    const state = await this.prisma.projectState.findUnique({
      where: { id },
    });
    return state;
  }

  @Mutation(() => Project)
  async createProject(@Context('userId') userId: string) {
    return this.prisma.project.create({
      data: {
        title: 'New Project',
        states: {
          create: {
            count: 0,
          },
        },
      },
    });
  }

  @Mutation(() => Boolean)
  async incrementCount(
    @Args({ name: 'projectId', type: () => String })
    projectId: string,
    @Context('userId') userId: string
  ) {
    const state = await this.prisma.projectState.findFirst({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    const prevCount = state?.count || 0;

    const newState = await this.prisma.projectState.create({
      data: { projectId, count: prevCount + 1 },
    });

    this.pubsub.publish('projectStateUpdated', {
      projectId,
      projectStateUpdated: newState.id,
    });

    const uselessState = await this.prisma.projectState.findFirst({
      where: { projectId, deleted: false },
      orderBy: { createdAt: 'desc' },
      skip: 50,
    });

    if (uselessState) {
      await this.prisma.projectState.update({
        where: { id: uselessState.id },
        data: { deleted: true },
      });
    }

    return true;
  }

  @Subscription(() => String, {
    filter: ({ projectId }, args) => projectId === args.projectId,
  })
  projectStateUpdated(
    @Args({ name: 'projectId', type: () => String }) projectId: string
  ) {
    return this.pubsub.asyncIterator('projectStateUpdated');
  }
}
