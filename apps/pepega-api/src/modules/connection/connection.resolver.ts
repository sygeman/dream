import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ConnectionsService } from './connection.service';
import { ConnectionsCount } from './models/connectionsCount';
import { AuthGuard, AdminGuard } from '../../guards';

@Resolver()
export class ConnectionsResolvers {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Query(returns => ConnectionsCount)
  @UseGuards(AuthGuard, AdminGuard)
  async connectionsCount() {
    const [unique, users] = await Promise.all([
      this.connectionsService.countIP(),
      this.connectionsService.countUsers(),
    ]);

    return { unique, users };
  }
}
