import React from 'react';
import clsx from 'clsx';
import { Switch } from '@headlessui/react';

export const SwitchFormField: React.FC<{
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ title, description, checked, onChange }) => (
  <div className="w-full p-2 flex items-center">
    <Switch.Group>
      <div className="flex-1">
        <Switch.Label className="text-sm text-white mr-2" passive>
          {title}
        </Switch.Label>
        <Switch.Description className="text-xs text-accent mr-2">
          {description}
        </Switch.Description>
      </div>
      <Switch
        className={clsx(
          'relative inline-flex shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
          checked ? 'bg-primary' : 'bg-background'
        )}
        checked={checked}
        onChange={onChange}
      >
        <span
          aria-hidden="true"
          className={clsx(
            checked ? 'translate-x-5 bg-white' : 'translate-x-0 bg-accent',
            'pointer-events-none inline-block h-4 w-4 rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
  </div>
);
