import {
  useClipScoreQuery,
  useIncreaseClipScoreMutation,
  useDecreaseClipScoreMutation,
  useClipScoreUpdatedSubscription,
} from './clip-score.api';
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid';
import React from 'react';
import { useRouter } from 'next/router';
import { useAccess } from '@dream/pepega/auth/ui';

const ScoreButton = ({
  action,
  children,
}: {
  action: () => void;
  children?: React.ReactNode;
}) => {
  const router = useRouter();
  const [{ allow: isUser }] = useAccess();

  const openAuth = () =>
    router.push({
      pathname: router.route,
      query: {
        ...router.query,
        authModal: 1,
      },
    });

  return (
    <button
      className="px-4 py-2 hover:bg-twitch/50 text-white transition-colors delay-75"
      onClick={() => (isUser ? action() : openAuth())}
    >
      {children}
    </button>
  );
};

export interface ClipScoreProps {
  clipId: string;
}

export function ClipScore({ clipId }: ClipScoreProps) {
  const clipScoreQuery = useClipScoreQuery({ variables: { clipId } });
  const clipScore = clipScoreQuery?.data?.clipScore || 0;

  const [increaseClipScoreMutation] = useIncreaseClipScoreMutation();
  const increaseClipScore = () =>
    increaseClipScoreMutation({ variables: { clipId } });

  const [decreaseClipScoreMutation] = useDecreaseClipScoreMutation();
  const decreaseClipScore = () =>
    decreaseClipScoreMutation({ variables: { clipId } });

  useClipScoreUpdatedSubscription({
    variables: { clipId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      clipScoreQuery.updateQuery((prev) => ({
        ...prev,
        clipScore: subscriptionData?.data?.clipScoreUpdated || 0,
      }));
    },
  });

  const loading = clipScoreQuery.loading;

  return (
    <div className="flex bg-background mx-2 rounded-lg overflow-hidden">
      <ScoreButton action={increaseClipScore}>
        {loading ? <div className="w-4 h-4" /> : <PlusSmIcon className="h-4" />}
      </ScoreButton>
      <div className="flex px-4 -mx-2 z-10 items-center bg-twitch transition rounded-lg text-sm font-medium">
        {loading ? <div className="w-4 h-4" /> : clipScore}
      </div>
      <ScoreButton action={decreaseClipScore}>
        {loading ? (
          <div className="w-4 h-4" />
        ) : (
          <MinusSmIcon className="h-4" />
        )}
      </ScoreButton>
    </div>
  );
}
