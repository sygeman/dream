import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

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
      ipHash,
      community,
      channel,
    });

    return true;
  }
}
