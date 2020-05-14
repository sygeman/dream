import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './connection.entity';
import { Instance } from './instances.entity';
import { ConnectionsResolvers } from './connection.resolver';
import { UserModule } from '../user/user.module';
import { ConnectionsService } from './connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Connection, Instance]), UserModule],
  providers: [ConnectionsService, ConnectionsResolvers],
  exports: [ConnectionsService],
})
export class ConnectionModule {}
