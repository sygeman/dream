import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { Backgroud } from './background';
import { History } from './history';
import { Queue } from './queue';

type PlayQueueLayoutProperties = PropsWithChildren & {
  backgroudImageUrl?: string;
  hideWithBlur?: boolean;
  history?: ReactNode;
  current?: ReactNode;
  queue?: ReactNode;
  addActionAccent?: boolean;
  addActionLabel: string;
  addActionModalLink: string;
  onMinimalContentChanged?: (minimal: boolean) => void;
};

enum PlayQueueViewType {
  HISTORY,
  CURRENT,
  QUEUE,
}

export const PlayQueueLayout = ({
  children,
  backgroudImageUrl,
  hideWithBlur,
  history,
  current,
  queue,
  addActionModalLink,
  addActionAccent,
  addActionLabel,
  onMinimalContentChanged = () => {},
}: PlayQueueLayoutProperties) => {
  const [viewType, setViewType] = useState<PlayQueueViewType>(
    PlayQueueViewType.CURRENT
  );

  useEffect(() => {
    onMinimalContentChanged(viewType !== PlayQueueViewType.CURRENT);
  }, [onMinimalContentChanged, viewType]);

  return (
    <div className="h-screen w-full flex flex-1 flex-col relative overflow-hidden">
      <Backgroud imageUrl={backgroudImageUrl} />
      <div
        className="absolute left-0 top-0 w-full h-full flex flex-col"
        style={hideWithBlur ? { filter: 'blur(4px)', opacity: 0.5 } : undefined}
      >
        <History
          onSelect={() =>
            setViewType(
              viewType === PlayQueueViewType.HISTORY
                ? PlayQueueViewType.CURRENT
                : PlayQueueViewType.HISTORY
            )
          }
          hidden={viewType === PlayQueueViewType.QUEUE}
        >
          {history}
        </History>
        {current}
        <Queue
          addActionModalLink={addActionModalLink}
          addActionAccent={addActionAccent}
          addActionLabel={addActionLabel}
          hidden={viewType === PlayQueueViewType.HISTORY}
          onSelect={() =>
            setViewType(
              viewType === PlayQueueViewType.QUEUE
                ? PlayQueueViewType.CURRENT
                : PlayQueueViewType.QUEUE
            )
          }
        >
          {queue}
        </Queue>
      </div>
      {children}
    </div>
  );
};
