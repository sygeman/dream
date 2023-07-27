import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { deleteCommunityAction } from './actions';

export const DeleteCommunity = () => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="p-4">
      <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
        Delete Community
      </h2>
      <p className="mb-6 text-accent text-sm">
        Are yor sure want to delete the community? This cannot be undone.
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
          onClick={async () => {
            await deleteCommunityAction(params.community as string);
            router.push(`/`);
          }}
        >
          Delete Community
        </button>
      </div>
    </div>
  );
};
