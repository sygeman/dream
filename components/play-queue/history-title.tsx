import { ClockIcon } from '@heroicons/react/20/solid';

export const HistoryTitle = () => (
  <div className="flex text-xs text-accent font-medium px-4 py-2">
    <ClockIcon className="h-4 text-accent mr-2 opacity-50" />
    <span>Previous Plays</span>
  </div>
);
