import { useState } from 'react';
import { Input } from '@dream/pepega/components/input';
import { CoinIconGold } from '@dream/pepega/components/coin-icon';
import { TwitchClipPlayer } from '@dream/pepega/components/clip-player';
import { Button } from '@dream/pepega/components/button';
import { parseSource } from './parse-source';
import { useIncreaseClipScoreMutation } from '@dream/pepega/clip-score/ui';
import { useRouter } from 'next/router';

export const CreateClip = () => {
  const router = useRouter();
  const costCreateClip = 10;
  const [clipId, setClipId] = useState('');

  const [increaseClipScoreMutation] = useIncreaseClipScoreMutation();
  const increaseClipScore = (clipId: string) =>
    increaseClipScoreMutation({
      variables: { clipId },
      onCompleted: () => {
        router.push(`/clip/${clipId}`);
      },
    });

  const setSourceData = (e) => {
    const soruceData = parseSource(e.target.value);

    if (soruceData && soruceData.payload && soruceData.payload.sourceId) {
      setClipId(soruceData.payload.sourceId);
    }
  };

  return (
    <div className="w-[600px]">
      <Input
        autoFocus
        placeholder="Ссылка на Twitch клип"
        onChange={setSourceData}
      />
      {clipId && <TwitchClipPlayer sourceId={clipId} />}
      <div className="mt-5 flex justify-end">
        {costCreateClip > 0 && (
          <div className="flex px-5 items-center">
            <CoinIconGold /> {costCreateClip}
          </div>
        )}
        <Button onClick={() => increaseClipScore(clipId)}>Предложить</Button>
      </div>
    </div>
  );
};
