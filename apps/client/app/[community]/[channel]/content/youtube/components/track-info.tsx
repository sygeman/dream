type Props = {
  imageUrl?: string;
  artist?: string;
  name?: string;
  progress?: number;
};

export const TrackInfo = ({ imageUrl, artist, name, progress = 0 }: Props) => (
  <div className="flex relative w-full h-16">
    <div className="flex absolute left-0 bottom-0 w-full">
      <div className="h-16 w-16">
        <img src={imageUrl} alt="" />
      </div>
      <div className="flex flex-1 relative">
        <div
          className="absolute top-0 left-0 h-full opacity-50 bg-background"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="absolute top-0 left-0 h-full w-full flex items-center px-4">
          <div className="flex flex-col">
            <span className="text-base text-accent font-medium">{artist}</span>
            <span className="text-lg text-white">{name}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
