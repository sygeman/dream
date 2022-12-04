import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '../input';
import { trpc } from '../../utils/trpc';
import { CoinIconGold } from '../coin-icon';
import { TwitchClipPlayer } from '../clip-player';
import { useModal } from '../../utils/use-modal';
import { Modal } from '../modal';
import { parseSource } from './parse-source';

export const CreateClipModal = () => {
  const router = useRouter();
  const modalProps = useModal();
  const costCreateClip = 10;
  const [clipId, setClipId] = useState('');

  const increaseClipScoreMutation = trpc.clipScore.increase.useMutation();
  const increaseClipScore = (clipId: string) =>
    increaseClipScoreMutation.mutate(
      { id: clipId },
      {
        onSuccess: () => {
          router.push(`/clip/${clipId}`);
        },
      }
    );

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
