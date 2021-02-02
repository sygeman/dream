import { Module, HttpModule } from '@nestjs/common';
import { TwitchResolvers } from './twitch.resolver';
import { TwitchService } from './twitch.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
	imports: [HttpModule, ProfileModule],
	providers: [TwitchService, TwitchResolvers],
	exports: [TwitchService]
})
export class TwitchModule {}
