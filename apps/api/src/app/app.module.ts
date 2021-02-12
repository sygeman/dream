import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as depthLimit from 'graphql-depth-limit';
import { AuthModule, AuthService } from '@dream/auth-api';
import { UserModule } from '@dream/user-api';
import { ChatModule } from '@dream/chat-api';
import { ConnectionModule, ConnectionService } from '@dream/connection-api';
import { SharedModule } from './shared.module';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
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
        autoSchemaFile: 'schema.gql',
        context: async ({ req }) => {
          const accessToken = authService.accessTokenFromHeader(
            req?.headers?.authorization
          );

          let userId;
          let tokenIsInvalid = false;

          if (accessToken) {
            const payload: any = authService.jwtValidation(accessToken);

            if (payload) {
              userId = payload.userId;
            } else {
              tokenIsInvalid = true;
            }
          }

          return { userId, tokenIsInvalid };
        },
        subscriptions: {
          keepAlive: 3000,
          onConnect: async (
            connectionParams: { accessToken?: string },
            _webSocket,
            context
          ) => {
            const accessToken = connectionParams?.accessToken;

            let ipHash;

            const xForwardedFor =
              context.request.headers['x-original-forwarded-for'];

            if (xForwardedFor && typeof xForwardedFor === 'string') {
              const ip = xForwardedFor.split(/\s*,\s*/)[0];
              ipHash = Buffer.from(ip).toString('base64');
            }

            let userId;
            let tokenIsInvalid = false;

            if (accessToken) {
              const payload: any = authService.jwtValidation(accessToken);

              if (payload) {
                userId = payload.userId;
              } else {
                tokenIsInvalid = true;
              }
            }

            if (!tokenIsInvalid) {
              const { id: connectionId } = await connectionService.create({
                userId,
                ipHash,
              });

              return {
                userId,
                ipHash,
                connectionId,
                tokenIsInvalid,
              };
            }

            return false;
          },
          onDisconnect: async (_webSocket, context) => {
            const data = await context.initPromise;
            await connectionService.remove(data.connectionId);
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
    ConnectionModule,
    ChatModule,
  ],
})
export class AppModule {}
