import { Resolver, Query, Mutation, Context, Args, Int } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Query(() => Int)
  uniqCount() {
    return this.connectionService.uniqCount();
  }

  @Mutation(() => Boolean)
  async updateConnectionStatus(
    @Args({ name: 'community', type: () => String, nullable: true })
    community: string,
    @Args({ name: 'channel', type: () => String, nullable: true })
    channel: string,
    @Context() { userId, connectionId, ipHash }
  ) {
    this.connectionService.updateConnectionStatus({
      userId,
      connectionId,
      ipHash: `${ipHash}-${userId || 'anon'}`,
      community,
      channel,
    });

    return true;
  }
}
