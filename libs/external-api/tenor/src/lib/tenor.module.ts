import { PrismaModule } from '@dream/prisma';
import { HttpModule, Module } from '@nestjs/common';
import { TenorService } from './tenor.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [TenorService],
  exports: [TenorService],
})
export class TenorModule {}
