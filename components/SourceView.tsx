import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { IStore } from '../lib/store';
import { Icon } from '../ui/Icon';

const Box = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const ContentBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PreviewBox = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PreviewImg = styled('div')<{
  url: string;
  blur?: boolean;
}>`
  background: url("${({ url }) => url}") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  ${({ blur }) => blur && 'filter: blur(20px);'}
`;

const PreviewImgFrontBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImgFront = styled('div')<{
  url: string;
  blur?: boolean;
}>`
  background: url("${({ url }) => url}") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
`;

const PreviewPlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
`;

const PreviewPlayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000a3;
  height: 80px;
  width: 80px;
  border-radius: 100%;
  transition: all 0.1s ease-out;

  :hover {
    height: 90px;
    width: 90px;
  }

  i {
    margin-left: 12px;
    font-size: 80px;
  }
`;

const PreviewTags = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  margin: 10px;
`;

const PreviewBlurText = styled.div`
  padding: 5px;
  background: #0000005e;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 5px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

interface IProps {
  autoPlay?: boolean;
  preload?: boolean;
  playSourceKey: string;
  sourceType?: string;
  sourceId?: string;
  cover: string;
  nsfw?: boolean;
  spoiler?: boolean;
  store?: IStore;
}

const Preview = ({ url, onClick, nsfw, spoiler }) => (
  <PreviewBox onClick={onClick}>
    <PreviewImg url={url} blur />
    {!nsfw && !spoiler && (
      <PreviewImgFrontBox>
        <PreviewImgFront url={url} />
      </PreviewImgFrontBox>
    )}
    <PreviewTags>
      {nsfw && <PreviewBlurText>NSWF</PreviewBlurText>}
      {spoiler && <PreviewBlurText>Спойлер</PreviewBlurText>}
    </PreviewTags>
    <PreviewPlay>
      <PreviewPlayBox>
        <Icon type="play" />
      </PreviewPlayBox>
    </PreviewPlay>
  </PreviewBox>
);

@inject('store')
@observer
class SourceView extends React.Component<IProps> {
  public componentDidMount() {
    if (this.props.autoPlay || this.props.preload) {
      this.props.store.setPlaySource(this.props.playSourceKey);
    }
  }

  public componentWillUnmount() {
    if (this.props.playSourceKey === this.props.store.playSourceKey) {
      this.props.store.setPlaySource('');
    }
  }

  public playSource = () => {
    this.props.store.setPlaySource(this.props.playSourceKey);
  };

  public renderYoutubeVideo = (videoId: string) => {
    const preview = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;

    if (
      this.props.playSourceKey !== this.props.store.playSourceKey &&
      !this.props.autoPlay &&
      !this.props.preload
    ) {
      return (
        <Preview
          url={preview}
          onClick={this.playSource}
          nsfw={this.props.nsfw}
          spoiler={this.props.spoiler}
        />
      );
    }

    return (
      <Iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${
          this.props.preload ? 0 : 1
        }&rel=0`}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    );
  };

  public renderTwitchClip = (clipId: string, cover: string) => {
    const preview = cover;

    if (
      this.props.playSourceKey !== this.props.store.playSourceKey &&
      !this.props.autoPlay &&
      !this.props.preload
    ) {
      return (
        <Preview
          url={preview}
          nsfw={this.props.nsfw}
          spoiler={this.props.spoiler}
          onClick={this.playSource}
        />
      );
    }

    return (
      <Iframe
        src={`https://clips.twitch.tv/embed?clip=${clipId}&muted=false${
          this.props.preload ? '&autoplay=false' : ''
        }`}
        frameBorder="0"
        height="100%"
        allowFullScreen
        width="100%"
      />
    );
  };

  public render() {
    const { sourceType, sourceId, cover } = this.props;

    let content = null;

    if (sourceType === 'twitchClip') {
      content = this.renderTwitchClip(sourceId, cover);
    } else if (sourceType === 'youtubeVideo') {
      content = this.renderYoutubeVideo(sourceId);
    }

    return (
      <Box>
        <ContentBox>{content}</ContentBox>
      </Box>
    );
  }
}

export default SourceView;
