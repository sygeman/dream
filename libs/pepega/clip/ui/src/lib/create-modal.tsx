import { useState } from 'react';
import { Input } from '@dream/pepega/components/input';
import { CoinIconGold } from '@dream/pepega/components/coin-icon';
import { TwitchClipPlayer } from '@dream/pepega/components/clip-player';
import { parseSource } from './parse-source';
import { useIncreaseClipScoreMutation } from '@dream/pepega/clip-score/ui';
import { useRouter } from 'next/router';
import { useModal } from '@dream/mono-utils-use-modal';
import { Modal } from '@dream/pepega/components/modal';

export const CreateClipModal = () => {
  const router = useRouter();
  const modalProps = useModal();
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

  return (
    <Modal id="newClip" title="Предложить клип" {...modalProps}>
      <div className="w-[600px] bg-surface p-4 rounded overflow-hidden">
        <Input
          autoFocus
          placeholder="Ссылка на Twitch клип"
          onChange={(e) => {
            const soruceData = parseSource(e.target.value);

            if (
              soruceData &&
              soruceData.payload &&
              soruceData.payload.sourceId
            ) {
              setClipId(soruceData.payload.sourceId);
            }
          }}
        />
        {clipId && <TwitchClipPlayer sourceId={clipId} />}
        <div className="mt-5 flex justify-end">
          {costCreateClip > 0 && (
            <div className="flex px-5 items-center">
              <CoinIconGold /> {costCreateClip}
            </div>
          )}
          <button
            className="btn btn-primary"
            onClick={() => increaseClipScore(clipId)}
          >
            Предложить
          </button>
        </div>
      </div>
    </Modal>
  );
};
