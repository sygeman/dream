'use client';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  useRef,
} from 'react';

type Properties = {
  id: string;
  isOpen: (id: string) => boolean;
  onClose: (id: string) => void;
  menu: ReactNode;
} & PropsWithChildren;

export const ModalFull = ({
  id,
  isOpen,
  onClose,
  menu,
  children,
}: Properties) => {
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
            <div className="inline-block w-full h-full overflow-hidden transition-all transform bg-zinc-900">
              <div className="m-auto z-30 overflow-hidden flex h-full bg-background">
                <div className="w-1/4 min-w-min h-full bg-background flex justify-end pt-10">
                  <div className="text-white w-52">{menu}</div>
                </div>
                <div className="w-2/4 h-full p-4 pt-10 overflow-hidden rounded-l-xl bg-zinc-900 relative">
                  {children}
                </div>
                <div className="w-1/4 h-full pt-10 bg-zinc-900">
                  <button
                    ref={completeButtonReference}
                    className={clsx(
                      'btn h-8 w-8 p-0 text-muted-foreground border border-zinc-900-light rounded-full',
                      'focus:outline-none hover:text-white hover:border-zinc-900'
                    )}
                    onClick={close}
                  >
                    <XMarkIcon className="p-1.5" />
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
