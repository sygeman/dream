import { FC, useEffect, useState } from 'react';
import DashCount from './DashCount';

interface IProps {
  unique?: number;
  users?: number;
}

export const OnlineCount: FC<IProps> = ({ unique, users }) => {
  const [onlineHistory, setOnlineHistory] = useState([]);

  useEffect(() => {
    if (typeof unique === 'number' && typeof users === 'number') {
      setOnlineHistory([
        ...onlineHistory,
        {
          unique,
          users,
          date: Date.now()
        }
      ]);
    }
  }, [unique, users]);

  const historyCount = onlineHistory.length;
  const lastHistoryRow = onlineHistory[historyCount - 1];
  const currentCount1 = historyCount > 0 ? lastHistoryRow.unique : 0;
  const currentCount2 = historyCount > 0 ? lastHistoryRow.users : 0;

  return (
    <DashCount
      title="В сети"
      history={onlineHistory.map(d => ({ ...d, name: d.date })).slice(-10)}
      count={currentCount1}
      count2={currentCount2}
      chart
    />
  );
};
