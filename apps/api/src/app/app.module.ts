import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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

console.log('Cock');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          port: configService.get('db.redisPort'),
          host: configService.get('db.redisHost'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
        },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    GraphQLModule.forRootAsync({
      imports: [AuthModule, ConnectionModule],
      inject: [AuthService, ConnectionService],
      useFactory: async (
        authService: AuthService,
        connectionService: ConnectionService
      ) => ({
        installSubscriptionHandlers: true,
        validationRules: [depthLimit(10)],
        autoSchemaFile: 'apps/api/schema.gql',
        context: async ({ req, connection }) => {
          if (connection) {
            return connection.context;
          }

          const token = req?.headers?.authorization;
          const { userId } = await authService.getTokenData(token);

          return { userId, token };
        },
        subscriptions: {
          onConnect: async (
            connectionParams: { token?: string },
            _webSocket,
            context
          ) => {
            const token = connectionParams?.token;

            let ipHash;

            const xForwardedFor =
              context.request.headers['x-original-forwarded-for'];

            if (xForwardedFor && typeof xForwardedFor === 'string') {
              const ip = xForwardedFor.split(/\s*,\s*/)[0];
              ipHash = Buffer.from(ip).toString('base64');
            }

            const { userId } = await authService.getTokenData(token);

            const connectionId = nanoid();

            return {
              token,
              userId,
              ipHash,
              connectionId,
            };
          },
          onDisconnect: async (_webSocket, context) => {
            const data = await context.initPromise;
            const connectionId = data.connectionId;

            if (connectionId) {
              await connectionService.remove(connectionId);
            }
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
    ConnectionModule,
    CommunityModule,
    SpotifyModeModule,
    TwitchModeModule,
    YoutubeModeModule,
  ],
})
export class AppModule {}
