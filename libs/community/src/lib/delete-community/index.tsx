import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDeleteCommunityMutation } from '../community.api';
import { useCommunityChannel } from '@dream/utils/use-community-channel';

export const DeleteCommunity = () => {
  const router = useRouter();
  const { community, communityId } = useCommunityChannel();

  const [deleteCommunity] = useDeleteCommunityMutation({
    onCompleted: () => {
      router.push('/');
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Delete Community
      </h2>
      <p className="mb-6 text-accent text-sm">
        Are yor sure want to delete{' '}
        <span className="font-medium text-white">{community?.title}</span>? This
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
            deleteCommunity({ variables: { communityId } });
          }}
        >
          Delete Community
        </button>
      </div>
    </div>
  );
};
