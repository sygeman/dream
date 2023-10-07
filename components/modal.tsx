'use client';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useRef } from 'react';

export type ModalProperties = {
  id: string;
  isOpen: (id: string) => boolean;
  onClose: (id: string) => void;
  title?: string;
  minimal?: boolean;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProperties> = ({
  id,
  isOpen,
  onClose,
  minimal = false,
  title = '',
  children,
}) => {
  const completeButtonReference = useRef(null);
  const open = isOpen(id);
  const close = () => onClose(id);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto min-h-screen"
        static
        open={open}
        onClose={close}
        initialFocus={completeButtonReference}
      >
        <div className="min-h-screen px-4 text-center" tabIndex={1}>
          <Dialog.Overlay className="fixed inset-0 bg-background opacity-90" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-zinc-900 shadow-xl rounded-lg">
              <div className="m-auto z-30 bg-zinc-900 rounded-lg overflow-hidden">
                {!minimal && (
                  <div className="bg-zinc-900-light px-4 py-2 flex items-center">
                    <div className="flex flex-1 text-white text-sm">
                      {title}
                    </div>
                    <button
                      className="btn h-6 w-6 p-1 hover:bg-zinc-900 focus:outline-none text-muted-foreground"
                      onClick={close}
                    >
                      <XMarkIcon />
                    </button>
                  </div>
                )}
                <div className={minimal ? undefined : 'p-4'}>{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
