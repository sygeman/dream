import { PrismaModule } from '@dream/mono-prisma';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TenorService } from './tenor.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [TenorService],
  exports: [TenorService],
})
export class TenorModule {}
