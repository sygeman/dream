import { useState } from 'react';
import {
  Button,
  Input,
  CoinIconGold,
  TwitchClipPlayer,
} from '@dream/pepega/components-old';
import { parseSource } from '@dream/pepega/utils-old';
import { useIncreaseClipScoreMutation } from '@dream/pepega/clip-score/ui';

export const CreateCommunityClip = () => {
  const costCreateClip = 0;
  const [clipId, setClipId] = useState('');

  const [increaseClipScoreMutation] = useIncreaseClipScoreMutation();
  const increaseClipScore = (clipId: string) =>
    increaseClipScoreMutation({ variables: { clipId } });

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
        {costCreateClip === 0 && (
          <div className="flex px-5 items-center">
            <CoinIconGold /> {costCreateClip}
          </div>
        )}
        <Button onClick={() => increaseClipScore(clipId)}>Предложить</Button>
      </div>
    </div>
  );
};
