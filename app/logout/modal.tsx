'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Modal } from '@/components/modal';
import { useModal } from '@/helpers/use-modal';

export const LogoutModal = () => {
  const modalProperties = useModal();
  const router = useRouter();

  return (
    <Modal id="logout" title="Log Out" minimal {...modalProperties}>
      <div className="p-4">
        <h2 className="text-muted-foreground-light uppercase text-sm font-medium mb-2">
          Log Out
        </h2>
        <p className="mb-6 text-muted-foreground text-sm">
          Are yor sure you want to logout?
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
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      </div>
    </Modal>
  );
};
