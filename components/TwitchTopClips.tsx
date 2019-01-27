import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import gql from 'graphql-tag';
import { omit } from 'lodash';
import { RouterProps, withRouter } from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import { Query } from 'react-apollo';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import { Modal } from '../ui/Modal';
import { humanNumbers } from '../utils/count';
import GridPreview from './PostHelper/GridPreview';
import SourceView from './SourceView';

const GET_TWITCH_CHANNEL_TOP_CLIPS = gql`
  query twitchChannelTopClips($channel: String, $game: String, $limit: Int) {
    twitchChannelTopClips(channel: $channel, game: $game, limit: $limit) {
      id
      channel
      title
      createdAt
      thumbnails {
        small
        tiny
      }
      viewsCount
    }
  }
`;

const Box = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const ClipsBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
`;

const Clips = styled.div`
  width: 100%;
  display: grid;
  padding: 10px 20px;
  grid-template-columns: repeat(auto-fit, 280px);
  overflow-y: hidden;
  justify-content: center;
`;

const Clip = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  align-items: center;
`;

const ClipPreview = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  background: ${({ theme }) => theme.dark2Color};
`;

const ClipPreviewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ClipBottom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11.5px;
  color: ${({ theme }) => lighten(0.25, theme.main1Color)};
  width: 100%;
  line-height: 16px;
  padding: 4px 8px 4px 0;
`;

const ClipTitle = styled.div`
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.text1Color};
`;

const ClipAuthor = styled.a`
  display: flex;
`;

const ClipInModal = styled.div`
  width: 1300px;
`;

interface IProps {
  router: RouterProps;
  limit?: number;
}

class TwitchFollows extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    const { router, limit } = this.props;

    return (
      <Box>
        <ClipsBox>
          <SimpleBar>
            <Clips>
              <Query
                query={GET_TWITCH_CHANNEL_TOP_CLIPS}
                variables={{
                  channel: router.query.channel,
                  game: router.query.game,
                  limit
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return <div>Загрузка...</div>;
                  }

                  if (error || !data || !data.twitchChannelTopClips) {
                    return null;
                  }

                  const curretClipIndex = data.twitchChannelTopClips.findIndex(
                    ({ id }) => {
                      return router.query.clip === id;
                    }
                  );

                  const openClip = (clipId: string) => {
                    router.push({
                      pathname: router.route,
                      query: {
                        ...router.query,
                        clip: clipId
                      }
                    });
                  };

                  const clipsCount = data.twitchChannelTopClips.length;

                  const goPrev = () =>
                    openClip(
                      data.twitchChannelTopClips[curretClipIndex - 1].id
                    );

                  const goNext = () =>
                    openClip(
                      data.twitchChannelTopClips[curretClipIndex + 1].id
                    );

                  const sourceId = router.query.clip
                    ? router.query.clip.toString()
                    : null;

                  return (
                    <>
                      <Modal
                        isOpen={!!router.query.clip}
                        minimal
                        onLeftClick={curretClipIndex > 0 && goPrev}
                        onRightClick={
                          curretClipIndex < clipsCount - 1 && goNext
                        }
                        onClose={() => {
                          router.push({
                            pathname: router.route,
                            query: {
                              ...omit(router.query, 'clip')
                            }
                          });
                        }}
                      >
                        <ClipInModal>
                          <SourceView
                            playSourceKey={`${router.query.clip}top`}
                            sourceType={'twitchClip'}
                            sourceId={sourceId}
                            autoPlay
                            cover=""
                          />
                        </ClipInModal>
                      </Modal>
                      {data.twitchChannelTopClips.length === 0 && (
                        <div>Клипы не найдены</div>
                      )}
                      {data.twitchChannelTopClips.map(clip => (
                        <Clip key={clip.id}>
                          <ClipPreview>
                            <ClipPreviewContent>
                              <GridPreview
                                key={clip.id}
                                onClick={() => openClip(clip.id)}
                                cover={clip.thumbnails.small}
                                date={
                                  distanceInWordsToNow(
                                    +new Date(clip.createdAt),
                                    {
                                      locale: ruLocale
                                    }
                                  ) + ' назад'
                                }
                                views={humanNumbers(clip.viewsCount)}
                              />
                            </ClipPreviewContent>
                          </ClipPreview>
                          <ClipBottom>
                            <ClipTitle
                              onClick={() => openClip(clip.id)}
                              title={clip.title}
                            >
                              {clip.title}
                            </ClipTitle>
                            <ClipAuthor
                              href={`https://www.twitch.tv/${clip.channel}`}
                            >
                              {clip.channel}
                            </ClipAuthor>
                          </ClipBottom>
                        </Clip>
                      ))}
                    </>
                  );
                }}
              </Query>
            </Clips>
          </SimpleBar>
        </ClipsBox>
      </Box>
    );
  }
}

export default withRouter(TwitchFollows);
