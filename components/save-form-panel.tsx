import { Transition } from '@headlessui/react';

import { Button } from '@/components/ui/button';

type Properties = {
  show: boolean;
  reset: () => void;
};

export const SaveFormPanel = ({ show, reset }: Properties) => (
  <Transition
    as="div"
    className="flex w-full absolute left-0 bottom-4 p-2"
    show={show}
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    <div className="absolute top-0 left-0 w-full h-full px-4">
      <div className="w-full h-full bg-background opacity-75 rounded-md"></div>
    </div>
    <div className="flex w-full items-center z-20 px-4">
      <span className="flex flex-1 text-sm px-2">You have unsaved changes</span>
      <Button variant="ghost" size="sm" className="mr-2" onClick={reset}>
        Reset
      </Button>
      <Button type="submit" size="sm">
        Save Changes
      </Button>
    </div>
  </Transition>
);
