import { Module } from '@nestjs/common';
import { Context } from 'graphql-ws';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as depthLimit from 'graphql-depth-limit';
import { AuthModule, AuthService } from '@dream/auth-api';
import { UserModule } from '@dream/user-api';
import { CommunityModule } from '@dream/community-api';
import { ConnectionModule, ConnectionService } from '@dream/connection-api';
import { SharedModule } from './shared.module';
import { config } from './config';
import { nanoid } from 'nanoid';
import { BullModule } from '@nestjs/bull';
import { SpotifyModeModule } from '@dream/mode/spotify/api';
import { TwitchModeModule } from '@dream/mode/twitch/api';
import { YoutubeModeModule } from '@dream/mode/youtube/api';
import { EmojiModule } from '@dream/emoji/api';
import { CommunitySettingsModule } from '@dream/modules/community-settings/api';
import { ChannelSettingsModule } from '@dream/modules/channel-settings/api';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: configService.get('db.redisUrl'),
        defaultJobOptions: {
          removeOnComplete: true,
        },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, ConnectionModule],
      inject: [AuthService, ConnectionService],
      useFactory: async (
        authService: AuthService,
        connectionService: ConnectionService
      ) => ({
        installSubscriptionHandlers: true,
        validationRules: [depthLimit(10)],
        autoSchemaFile: join(process.cwd(), 'apps/pepega-api/schema.gql'),
        context: (ctx) => ctx?.extra?.socket?.ctx,
        subscriptions: {
          'graphql-ws': {
            onConnect: async (ctx: Context<any>) => {
              const token = ctx?.connectionParams?.token as string;

              let ipHash;

              const xForwardedFor =
                ctx?.extra?.request?.headers['x-original-forwarded-for'];

              if (xForwardedFor && typeof xForwardedFor === 'string') {
                const ip = xForwardedFor.split(/\s*,\s*/)[0];
                ipHash = Buffer.from(ip).toString('base64');
              }

              const { userId } = await authService.getTokenData(token);

              const connectionId = nanoid();

              const data = { token, userId, ipHash, connectionId };

              ctx.extra.socket.ctx = data;

              return data;
            },
            onDisconnect: async (ctx: Context<any>) => {
              const data = ctx?.extra?.socket?.ctx;

              const connectionId = data.connectionId;
              if (connectionId) {
                await connectionService.remove(connectionId);
              }
            },
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
    ConnectionModule,
    CommunityModule,
    CommunitySettingsModule,
    ChannelSettingsModule,
    SpotifyModeModule,
    TwitchModeModule,
    YoutubeModeModule,
    EmojiModule,
  ],
})
export class AppModule {}
