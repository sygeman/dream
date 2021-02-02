import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as depthLimit from 'graphql-depth-limit';

import authConfig from './config/auth.config';
import authGoogleConfig from './config/authGoogle.config';
import authTwitchConfig from './config/authTwitch.config';
import authVKConfig from './config/authVK.config';
import baseConfig from './config/base.config';
import dbConfig from './config/db.config';
import robokassaConfig from './config/robokassa.config';

import { SharedModule } from './modules/shared/shared.module';

import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';

import { TwitchModule } from './modules/twitch/twitch.module';

import { WalletModule } from './modules/wallet/wallet.module';
import { RobokassaModule } from './modules/robokassa/robokassa.module';

import { ChannelModule } from './modules/channel/channel.module';
import { ChannelPromoterModule } from './modules/channelPromoter/channelPromoter.module';

import { ClipModule } from './modules/clip/clip.module';
import { ClipHistoryModule } from './modules/clipHistory/clipHistory.module';
import { ClipCommentModule } from './modules/clipComment/clipComment.module';
import { ClipReactionModule } from './modules/clipReaction/clipReaction.module';
import { ClipCollectionModule } from './modules/clipCollection/clipCollection.module';
import { ClipCollectorModule } from './modules/clipCollector/clipCollector.module';

import { CommunityModule } from './modules/community/community.module';
import { CommunityFollowModule } from './modules/communityFollow/communityFollow.module';
import { CommunityClipModule } from './modules/communityClip/communityClip.module';

import { ChatModule } from './modules/chat/chat.module';

import { AuthService } from './modules/auth/auth.service';
import { UsersService } from './modules/user/user.service';
import { ConnectionsService } from './modules/connection/connection.service';

import { AppQueue } from './app.queue';

@Module({
  providers: [AppQueue],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        authConfig,
        authGoogleConfig,
        authTwitchConfig,
        authVKConfig,
        baseConfig,
        dbConfig,
        robokassaConfig
      ]
    }),
    SharedModule,
    AuthModule,
    ClipModule,
    UserModule,
    ProfileModule,
    CommunityClipModule,
    ClipReactionModule,
    TwitchModule,
    ConnectionModule,
    CommunityModule,
    CommunityFollowModule,
    ChatModule,
    WalletModule,
    ClipCommentModule,
    ClipCollectionModule,
    ClipCollectorModule,
    RobokassaModule,
    ChannelModule,
    ClipHistoryModule,
    ChannelPromoterModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('db.pgUrl'),
        entities: [__dirname + '/**/*.entity.*'],
        synchronize: true,
        cache: false,
        ssl: configService.get('db.pgSsl')
      })
    }),
    GraphQLModule.forRootAsync({
      imports: [ConnectionModule, UserModule, AuthModule],
      inject: [ConnectionsService, UsersService, AuthService],
      useFactory: async (
        connectionsService: ConnectionsService,
        usersService: UsersService,
        authService: AuthService
      ) => ({
        autoSchemaFile: './src/generated/schema.gql',
        installSubscriptionHandlers: true,
        introspection: true,
        validationRules: [depthLimit(10)],
        context: async ({ req, connection }) => {
          if (connection) {
            return connection.context;
          }

          const userData: any = authService.parseAuthToken(
            req.headers.authorization
          );
          const userId = userData ? userData.userId : null;
          let user = null;

          if (userId) {
            user = await usersService.findOne({ where: { id: userId } });
          }

          return { user, userId, userData };
        },
        subscriptions: {
          onConnect: async (connectionParams, webSocket, context) => {
            const jwtPayload: any = authService.jwtValidation(
              connectionParams.accessToken
            );
            let userId = jwtPayload ? jwtPayload.userId : null;
            let user = null;
            let ip = '0.0.0.0';

            const xForwardedFor =
              context.request.headers['x-original-forwarded-for'];

            if (xForwardedFor && typeof xForwardedFor === 'string') {
              ip = xForwardedFor.split(/\s*,\s*/)[0];
            }

            if (userId) {
              user = await usersService.findOne({ where: { id: userId } });

              if (!user) {
                userId = null;
              }
            }

            const connection = await connectionsService.create({ userId, ip });

            return {
              ip,
              user,
              userId,
              userData: jwtPayload,
              connectionId: connection.id
            };
          },
          onDisconnect: async (webSocket, context) => {
            const data = await context.initPromise;
            await connectionsService.remove(data.connectionId);
          }
        }
      })
    })
  ]
})
export class AppModule {}
