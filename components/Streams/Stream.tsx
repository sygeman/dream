import { FC } from 'react';
import styled from 'styled-components';
import { CardMedia } from '../../ui/CardMedia';
import { TwitchPlayer } from '../../ui/TwitchPlayer';
import { VideoPreview } from '../../ui/VideoPreview';

interface IProcess {
  browser: boolean;
}

declare var process: IProcess;

const PreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StreamOverLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StreamBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface IProps {
  id: string;
  cost: number;
  name: string;
  title: string;
  avatar: string;
  livePreview: boolean;
}

const Stream: FC<IProps> = ({ id, cost, name, title, avatar, livePreview }) => {
  let Media = null;
  const descriptionLink = `https://www.twitch.tv/${name}`;

  if (livePreview) {
    Media = (
      <>
        <StreamBox>
          {process.browser && <TwitchPlayer muted channel={name} />}
        </StreamBox>
        <StreamOverLink href={descriptionLink} target="_blank" />
      </>
    );
  } else {
    const previewImg = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${name}-${290}x${163}.jpg`;

    Media = (
      <PreviewContent>
        <VideoPreview cover={previewImg} />
      </PreviewContent>
    );
  }

  return (
    <CardMedia
      media={Media}
      avatar={avatar}
      title={title}
      description={name}
      descriptionLink={descriptionLink}
      count={cost}
      countIcon="circle-o"
    />
  );
};

export default Stream;
