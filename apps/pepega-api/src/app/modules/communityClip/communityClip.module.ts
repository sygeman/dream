import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommunityClip } from './communityClip.entity';

import { CommunityClipService } from './communityClip.service';
import { CommunityClipResolver } from './communityClip.resolver';

import { ClipModule } from '../clip/clip.module';
import { CommunityModule } from '../community/community.module';
import { ClipReactionModule } from '../clipReaction/clipReaction.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityClip]),
    CommunityModule,
    ClipReactionModule,
    ClipModule,
    WalletModule
  ],
  providers: [CommunityClipService, CommunityClipResolver],
  exports: [CommunityClipService]
})
export class CommunityClipModule {}
