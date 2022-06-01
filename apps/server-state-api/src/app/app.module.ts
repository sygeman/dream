import { Module } from '@nestjs/common';
import { Context } from 'graphql-ws';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as depthLimit from 'graphql-depth-limit';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule, AuthService } from '@dream/server-state/auth/api';
import { UserModule } from '@dream/server-state/user/api';
import {
  ConnectionModule,
  ConnectionService,
} from '@dream/server-state/connection/api';
import { SharedModule } from './shared.module';
import { config } from './config';
import { nanoid } from 'nanoid';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ProjectModule } from '@dream/server-state/project/api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: 60,
        limit: 10,
      }),
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
        autoSchemaFile: join(process.cwd(), 'apps/server-state-api/schema.gql'),
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
    ProjectModule,
  ],
})
export class AppModule {}
