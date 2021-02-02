import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { ClipCollection } from './clipCollection.entity';
// import { ClipCollectionClip } from './clipCollectionClip.entity';

import { ClipCollectorService } from './clipCollector.service';
// // import { ClipCommentResolver } from './clipComment.resolver';

import { TwitchModule } from '../twitch/twitch.module';
import { ClipCollectionModule } from '../clipCollection/clipCollection.module';

@Module({
  imports: [TwitchModule, ClipCollectionModule],
  providers: [ClipCollectorService],
  exports: [ClipCollectorService],
})
export class ClipCollectorModule {}
