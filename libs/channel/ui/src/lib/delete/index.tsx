import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDeleteChannelMutation } from '../channel.api';
import { useCommunityChannel } from '@dream/utils/use-community-channel';

export const DeleteChannel = () => {
  const router = useRouter();
  const { community, channel, channelId } = useCommunityChannel();

  const [deleteChannel] = useDeleteChannelMutation({
    onCompleted: () => {
      router.push(`/${community?.name}`);
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Delete Channel
      </h2>
      <p className="mb-6 text-accent text-sm">
        Are yor sure want to delete{' '}
        <span className="font-medium text-white">{channel?.title}</span>? This
        cannot be undone.
      </p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className={clsx('btn btn-primary')}
          onClick={() => {
            deleteChannel({ variables: { channelId } });
          }}
        >
          Delete Channel
        </button>
      </div>
    </div>
  );
};
