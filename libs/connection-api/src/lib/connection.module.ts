import { Module } from '@nestjs/common';
import { PrismaModule } from '@pepega/prisma';
import { ConnectionService } from './connection.service';

@Module({
  imports: [PrismaModule],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
