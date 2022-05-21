import clsx from 'clsx';
import { HistoryTitle } from './history-title';

export const History: React.FC<{ hidden?: boolean; onSelect?: () => void }> = ({
  hidden = false,
  onSelect = () => null,
  children,
}) => {
  return (
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
};
