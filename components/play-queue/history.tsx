import clsx from 'clsx';
import { HistoryTitle } from './history-title';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  hidden?: boolean;
  onSelect?: () => void;
};

export const History = ({
  hidden = false,
  onSelect = () => null,
  children,
}: Props) => (
  <div
    className={clsx(
      'flex flex-col shrink-0 justify-end py-2 overflow-hidden',
      !hidden && 'flex-1',
    )}
  >
    {!hidden && children}
    <div onClick={onSelect}>
      <HistoryTitle />
    </div>
  </div>
);
