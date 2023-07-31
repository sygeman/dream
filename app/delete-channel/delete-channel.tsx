import React from 'react';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { deleteChannelAction } from './actions';

export const DeleteChannel = () => {
  const router = useRouter();
  const params = useParams();

  const deleteChannel = async () => {
    await deleteChannelAction({
      channel: params.channel as string,
      community: params.community as string,
    });

    router.push(`/${params.community}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Delete Channel
      </h2>
      <p className="mb-6 text-accent text-sm">
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
