"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useModal } from "@/helpers/use-modal";
import { Modal } from "@/components/modal";
import { signOut } from "next-auth/react";

export const LogoutModal = () => {
  const modalProps = useModal();
  const router = useRouter();

  return (
    <Modal id="logout" title="Log Out" minimal {...modalProps}>
      <div className="p-4">
        <h2 className="text-accent-light uppercase text-sm font-medium mb-2">
          Log Out
        </h2>
        <p className="mb-6 text-accent text-sm">
          Are yor sure you want to logout?
        </p>
        <div className="flex w-full justify-end">
          <button
            type="button"
            className={clsx("btn mr-2")}
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="button"
            className={clsx("btn btn-primary")}
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      </div>
    </Modal>
  );
};
