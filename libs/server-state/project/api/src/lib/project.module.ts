import { PrismaModule } from '@dream/server-state/prisma';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ProjectResolver],
  exports: [],
})
export class ProjectModule {}
