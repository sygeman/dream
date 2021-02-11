// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// import authConfig from './config/auth.config';
// import authGoogleConfig from './config/authGoogle.config';
// import authTwitchConfig from './config/authTwitch.config';
// import authVKConfig from './config/authVK.config';
// import baseConfig from './config/base.config';
// import dbConfig from './config/db.config';
// import robokassaConfig from './config/robokassa.config';

// import { SharedModule } from './modules/shared/shared.module';

// import { UserModule } from './modules/user/user.module';
// import { ProfileModule } from './modules/profile/profile.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { ConnectionModule } from './modules/connection/connection.module';

// import { TwitchModule } from './modules/twitch/twitch.module';

// import { WalletModule } from './modules/wallet/wallet.module';
// import { RobokassaModule } from './modules/robokassa/robokassa.module';

// import { ChannelModule } from './modules/channel/channel.module';
// import { ChannelPromoterModule } from './modules/channelPromoter/channelPromoter.module';

// import { ClipModule } from './modules/clip/clip.module';
// import { ClipHistoryModule } from './modules/clipHistory/clipHistory.module';
// import { ClipCommentModule } from './modules/clipComment/clipComment.module';
// import { ClipReactionModule } from './modules/clipReaction/clipReaction.module';
// import { ClipCollectionModule } from './modules/clipCollection/clipCollection.module';
// import { ClipCollectorModule } from './modules/clipCollector/clipCollector.module';

// import { CommunityModule } from './modules/community/community.module';
// import { CommunityFollowModule } from './modules/communityFollow/communityFollow.module';
// import { CommunityClipModule } from './modules/communityClip/communityClip.module';

// import { ChatModule } from './modules/chat/chat.module';

// import { AppQueue } from './app.queue';

// @Module({
//   providers: [AppQueue],
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [
//         authConfig,
//         authGoogleConfig,
//         authTwitchConfig,
//         authVKConfig,
//         baseConfig,
//         dbConfig,
//         robokassaConfig,
//       ],
//     }),
//     SharedModule,
//     AuthModule,
//     ClipModule,
//     UserModule,
//     ProfileModule,
//     CommunityClipModule,
//     ClipReactionModule,
//     TwitchModule,
//     ConnectionModule,
//     CommunityModule,
//     CommunityFollowModule,
//     ChatModule,
//     WalletModule,
//     ClipCommentModule,
//     ClipCollectionModule,
//     ClipCollectorModule,
//     RobokassaModule,
//     ChannelModule,
//     ClipHistoryModule,
//     ChannelPromoterModule,
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         url: configService.get('db.pgUrl'),
//         entities: [__dirname + '/**/*.entity.*'],
//         synchronize: true,
//         cache: false,
//         ssl: configService.get('db.pgSsl'),
//       }),
//     }),
//   ],
// })
// export class AppModule {}
