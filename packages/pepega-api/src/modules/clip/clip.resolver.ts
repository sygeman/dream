import {
  Query,
  Resolver,
  Args,
  ResolveProperty,
  Parent,
  Context,
} from '@nestjs/graphql';
import { ClipService } from './clip.service';
import { Clip } from './models/clip';
import { Clips } from './models/clips';
import { ClipsArgs } from './dto/clips.args';

@Resolver(of => Clip)
export class ClipResolver {
  constructor(private readonly clipService: ClipService) {}

  @ResolveProperty()
  async watched(@Parent() clip: Clip, @Context('userId') userId: string) {
    if (!userId) {
      return false;
    }

    return await this.clipService.isInHistory(clip.id, userId);
  }

  @ResolveProperty()
  async sourceUrl(@Parent() clip: Clip) {
    return clip.thumbnail_url.replace(/\-\bpreview\-\b.+/, '.mp4');
  }

  @Query(returns => Clips, { nullable: true })
  async clips(@Args() args: ClipsArgs) {
    // args.collectionId check access

    return this.clipService.clips(args);
  }
}
