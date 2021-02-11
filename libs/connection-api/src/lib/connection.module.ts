import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { ConnectionService } from './connection.service';

@Module({
  imports: [PrismaModule],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
