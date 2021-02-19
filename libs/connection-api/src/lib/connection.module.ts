import { Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ConnectionService, ConnectionResolver],
  exports: [ConnectionService],
})
export class ConnectionModule {}
