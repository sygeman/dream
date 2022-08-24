import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule, AuthService } from '@dream/mono-auth-api';
import { UserModule } from '@dream/mono-user-api';
import { CommunityModule } from '@dream/mono-community-api';
import {
  ConnectionModule,
  ConnectionService,
} from '@dream/mono-connection-api';
import { config } from './config';
import { nanoid } from 'nanoid';
import { BullModule } from '@nestjs/bull';
import { SpotifyModeModule } from '@dream/mono-mode-spotify-api';
import { TwitchModeModule } from '@dream/mono-mode-twitch-api';
import { YoutubeModeModule } from '@dream/mono-mode-youtube-api';
import { EmojiModule } from '@dream/mono-emoji-api';
import { CommunitySettingsModule } from '@dream/mono-community-settings-api';
import { ChannelSettingsModule } from '@dream/mono-channel-settings-api';
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
    // SharedModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule, ConnectionModule],
      inject: [AuthService, ConnectionService],
      useFactory: async (
        authService: AuthService,
        connectionService: ConnectionService
      ) => ({
        installSubscriptionHandlers: true,
        // validationRules: [depthLimit(10)],
        autoSchemaFile: join(process.cwd(), 'apps/mono-api/schema.gql'),
        context: (ctx) => ctx?.extra?.socket?.ctx,
        subscriptions: {
          'graphql-ws': {
            onConnect: async (ctx: any) => {
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
            onDisconnect: async (ctx: any) => {
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
