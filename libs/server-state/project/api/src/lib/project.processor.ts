import { PrismaService } from '@dream/server-state/prisma';
import { Process, Processor } from '@nestjs/bull';

@Processor('project')
export class ProjectProcessor {
  constructor(private prisma: PrismaService) {}

  @Process('cleanup')
  async handleCleanup() {
    await this.prisma.projectState.deleteMany({
      where: { deleted: true },
    });
  }
}
