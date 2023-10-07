'use client';

import { type ReactNode } from 'react';

import { Switch } from '@/components/ui/switch';

type Properties = {
  title: string | ReactNode;
  description: string | ReactNode;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const SwitchFormField = ({
  title,
  description,
  checked,
  onChange,
}: Properties) => (
  <div className="w-full p-2 flex items-center">
    <div className="flex-1">
      <div className="text-sm text-white mr-2">{title}</div>
      <div className="text-xs text-muted-foreground mr-2">{description}</div>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);
