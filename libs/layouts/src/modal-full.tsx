import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export type ModalProps = {
  routerKey: string;
  menu: React.ReactNode;
};

export const ModalFull: React.FC<ModalProps> = ({
  menu,
  routerKey,
  children,
}) => {
  const router = useRouter();
  const open = router && !!router.query[routerKey];

  const closeModal = () => {
    const { [routerKey]: k, ...query } = router.query;
    router.push({ pathname: router.pathname, query });
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto min-h-screen"
        static
        open={open}
        onClose={closeModal}
      >
        <div className="h-full w-full" tabIndex={2}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full h-full overflow-hidden transition-all transform bg-surface">
              <div className="m-auto z-30 overflow-hidden flex h-full">
                <div className="w-1/4 min-w-min h-full bg-backgorud flex justify-end pt-10">
                  <div className="text-white w-52">{menu}</div>
                </div>
                <div className="w-2/4 h-full p-4 pt-10">{children}</div>
                <div className="w-1/4 h-full pt-10">
                  <button
                    className={clsx(
                      'btn h-8 w-8 p-0 text-accent border border-surface-light rounded-full',
                      'focus:outline-none hover:text-white hover:border-surface'
                    )}
                    onClick={closeModal}
                  >
                    <XIcon className="p-1.5" />
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
