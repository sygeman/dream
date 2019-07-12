import { FC } from 'react';
import ClipReactionProvider from '../../providers/ClipReaction';
import ClipReactionStatsProvider from '../../providers/ClipReactionStats';
import { ClipReactionButton } from './ClipReactionButton';
import { ClipReactionType } from './types/ClipReactionType';

interface IProps {
  clipId: string;
}

export const ClipReactions: FC<IProps> = ({ clipId }) => {
  return (
    <ClipReactionProvider clipId={clipId}>
      {({ clipReaction }) => {
        const reaction = clipReaction ? clipReaction.type : 'none';

        return (
          <ClipReactionStatsProvider clipId={clipId}>
            {({ clipReactionStats }) => {
              return (
                <>
                  <ClipReactionButton
                    id={clipId}
                    type="like"
                    state={reaction === ClipReactionType.like}
                    count={clipReactionStats ? clipReactionStats.likes : 0}
                    icon="thumb-up"
                  />
                  <ClipReactionButton
                    id={clipId}
                    type="dislike"
                    state={reaction === ClipReactionType.dislike}
                    count={clipReactionStats ? clipReactionStats.dislikes : 0}
                    icon="thumb-down"
                  />
                </>
              );
            }}
          </ClipReactionStatsProvider>
        );
      }}
    </ClipReactionProvider>
  );
};
