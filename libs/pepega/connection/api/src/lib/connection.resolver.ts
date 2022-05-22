import { Resolver, Query, Mutation, Context, Args, Int } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Mutation(() => Boolean)
  async updateConnectionStatus(@Context() { userId, connectionId, ipHash }) {
    this.connectionService.updateConnectionStatus({
      userId,
      connectionId,
      ipHash: `${ipHash}-${userId || 'anon'}`,
    });

    return true;
  }
}
