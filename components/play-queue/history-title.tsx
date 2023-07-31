import { ClockIcon } from '@heroicons/react/20/solid';

export const HistoryTitle = () => (
  <div className="flex text-xs text-muted-foreground font-medium px-4 py-2">
    <ClockIcon className="h-4 text-muted-foreground mr-2 opacity-50" />
    <span>Previous Plays</span>
  </div>
);
