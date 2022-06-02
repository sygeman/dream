import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

export type ModalProps = {
  id: string;
  isOpen: (id: string) => boolean;
  onClose: (id: string) => void;
  title?: string;
  minimal?: boolean;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  minimal = false,
  title = '',
  children,
}) => {
  const completeButtonRef = useRef(null);
  const open = isOpen(id);
  const close = () => onClose(id);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[150] overflow-y-auto min-h-screen"
        static
        open={open}
        onClose={close}
        initialFocus={completeButtonRef}
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
            <div className="inline-block w-full max-w-fit my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">
              {!minimal && (
                <div className="bg-surface-light px-4 py-2 flex items-center">
                  <div className="flex flex-1 text-white text-sm">{title}</div>
                  <button
                    className="btn h-6 w-6 p-1 hover:bg-surface focus:outline-none text-accent"
                    onClick={close}
                  >
                    <XIcon />
                  </button>
                </div>
              )}
              <div className={!minimal ? 'p-4' : undefined}>{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
