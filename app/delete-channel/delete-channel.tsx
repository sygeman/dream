import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { deleteChannelAction } from './actions';

export const DeleteChannel = () => {
  const router = useRouter();
  const parameters = useParams();

  const deleteChannel = async () => {
    await deleteChannelAction({
      channel: parameters.channel as string,
      community: parameters.community as string,
    });

    router.push(`/${parameters.community}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-muted-foreground-light uppercase text-sm font-medium mb-2">
        Delete Channel
      </h2>
      <p className="mb-6 text-muted-foreground text-sm">
        Are yor sure want to delete the channel? This cannot be undone.
      </p>
      <div className="flex w-full justify-end">
        <button
          type="button"
          className={clsx('btn mr-2')}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="button"
          className={clsx('btn btn-primary')}
          onClick={deleteChannel}
        >
          Delete Channel
        </button>
      </div>
    </div>
  );
};
