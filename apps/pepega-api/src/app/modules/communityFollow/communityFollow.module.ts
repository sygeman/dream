import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommunityFollow } from './communityFollow.entity';

import { CommunityFollowService } from './communityFollow.service';
import { CommunityFollowResolver } from './communityFollow.resolver';

// import { ClipModule } from '../clip/clip.module';
// import { CommunityModule } from '../community/community.module';
// import { ClipReactionModule } from '../clipReaction/clipReaction.module';
// import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityFollow])
    // CommunityModule,
    // ClipReactionModule,
    // ClipModule,
    // WalletModule
  ],
  providers: [CommunityFollowService, CommunityFollowResolver],
  exports: [CommunityFollowService]
})
export class CommunityFollowModule {}
