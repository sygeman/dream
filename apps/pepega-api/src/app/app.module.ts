import { Module } from '@nestjs/common';
import { Context } from 'graphql-ws';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as depthLimit from 'graphql-depth-limit';
import { AuthModule, AuthService } from '@dream/pepega/auth/api';
import { UserModule } from '@dream/pepega/user/api';
import {
  ConnectionModule,
  ConnectionService,
} from '@dream/pepega/connection/api';
import { SharedModule } from './shared.module';
import { config } from './config';
import { nanoid } from 'nanoid';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ClipModule } from '@dream/pepega/clip/api';
import { ClipCommentModule } from '@dream/pepega/clip-comment/api';
import { ClipHistoryModule } from '@dream/pepega/clip-history/api';
import { ClipScoreModule } from '@dream/pepega/clip-score/api';
import { UserCoinModule } from '@dream/pepega/user-coin/api';

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
    ClipModule,
    ClipCommentModule,
    ClipHistoryModule,
    ClipScoreModule,
    UserCoinModule,
  ],
})
export class AppModule {}
