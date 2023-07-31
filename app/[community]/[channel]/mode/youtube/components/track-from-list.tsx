import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

type Properties = {
  cover?: string;
  artists?: string;
  title?: string;
  avatar?: string;
  username?: string;
  info?: string;
};

export const TrackFromList = ({
  cover,
  artists,
  title,
  avatar,
  username = '',
  info = '',
}: Properties) => (
  <div className="flex px-4 py-1 items-center opacity-70 hover:opacity-100 group">
    <div>
      <img src={cover} className="h-8 w-8" alt="" />
    </div>
    <div className="flex flex-col text-sm px-2">
      <div className="text-sm">{artists}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
    <div className="flex items-center h-full ml-auto">
      <div className="text-sm px-2 text-muted-foreground">{info}</div>
      <div
        className="flex rounded-full overflow-hidden h-6 w-6 bg-zinc-900"
        title={username}
      >
        <img src={avatar} className="" alt="" />
      </div>
      <div className="ml-2">
        <button className="h-6 w-6 flex btn p-0 items-center justify-center opacity-0 group-hover:opacity-100">
          <EllipsisVerticalIcon className="h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  </div>
);
