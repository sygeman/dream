import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { HistoryTitle } from './history-title';

type Properties = PropsWithChildren & {
  hidden?: boolean;
  onSelect?: () => void;
};

export const History = ({
  hidden = false,
  onSelect = () => {},
  children,
}: Properties) => (
  <div
    className={clsx(
      'flex flex-col shrink-0 justify-end py-2 overflow-hidden',
      !hidden && 'flex-1'
    )}
  >
    {!hidden && children}
    <div onClick={onSelect}>
      <HistoryTitle />
    </div>
  </div>
);
