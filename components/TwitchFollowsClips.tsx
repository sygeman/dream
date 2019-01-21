import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import { Query } from 'react-apollo';
import ProgressiveImage from 'react-progressive-image';
import SimpleBar from 'simplebar-react';
import { connect } from '../auth';
import config from '../config';
import styled from '../theme';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Modal } from '../ui/Modal';
import { humanNumbers } from '../utils/count';
import { changeURLParams } from '../utils/url';
import Access from './Access';
import SourceView from './SourceView';

interface IProcess {
  browser: boolean;
}

declare var process: IProcess;

const Box = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const ChannelsBox = styled.div`
  min-width: 240px;
  width: 240px;
  background: ${({ theme }) => theme.dark1Color};
`;

const ChannelsCount = styled.div`
  color: ${({ theme }) => theme.accent2Color};
  font-size: 13px;
  width: 100%;
  text-align: center;
  padding: 16px 0;
  text-transform: uppercase;
`;

const Channels = styled.div``;

const Channel = styled('div')<{
  active?: boolean;
}>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 5px 20px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ theme, active }) =>
    active ? lighten(0.1, theme.dark2Color) : 'transparent'};

  :hover {
    background: ${({ theme, active }) =>
      active
        ? lighten(0.1, theme.dark2Color)
        : lighten(0.05, theme.dark2Color)};
  }
`;

const LoadMoreChannels = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  font-size: 14px;
  background: ${({ theme }) => lighten(0.1, theme.dark2Color)};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => lighten(0.2, theme.dark2Color)};
  }
`;

const ClipsBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  background: ${({ theme }) =>
    'radial-gradient(' + theme.main1Color + ', ' + theme.dark2Color + ')'};
`;

const ClipsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-transform: uppercase;
  width: 100%;
  color: ${({ theme }) => theme.text1Color};
  min-height: 50px;
  /* border-bottom: 1px solid ${({ theme }) => theme.dark2Color}; */
`;

const Clips = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  padding: 20px;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  overflow-y: hidden;
`;

const Clip = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

const ClipPreview = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  background: ${({ theme }) => theme.dark2Color};
`;

const ClipPreviewImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ClipTitle = styled.div`
  padding: 5px 0;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const ClipBottom = styled.div`
  display: flex;
  font-size: 12px;
  color: ${({ theme }) => theme.accent2Color};
  width: 100%;
  justify-content: center;
`;

const ClipViewsCount = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  margin: 0 5px;
  background: ${({ theme }) => theme.dark2Color};
  color: ${({ theme }) => theme.text1Color};
  border-radius: 5px;

  i {
    margin-right: 5px;
    font-size: 11px;
  }
`;

const ClipDate = styled.div`
  display: flex;
`;

const ClipInModal = styled.div`
  width: 1300px;
`;

const NoConnectTwitchAccount = styled.div`
  min-height: 50px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.main1Color};
`;

const NoConnectTwitchAccountText = styled.div`
  padding: 0 10px;
`;

const GET_USER_TWITCH_FOLLOWS = gql`
  query userTwitchFollows($limit: Int, $offset: Int) {
    userTwitchFollows(offset: $offset, limit: $limit) {
      count
      follows {
        title
        name
      }
    }
  }
`;

const GET_TWITCH_CHANNEL_TOP_CLIPS = gql`
  query twitchChannelTopClips($channel: String!) {
    twitchChannelTopClips(channel: $channel) {
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

interface IProps {
  router: RouterProps;
}

const auth = (service: string) => {
  changeURLParams({ remove: ['auth'] });

  if (!process.browser) {
    return;
  }

  setTimeout(() => {
    location.href = `${config.apiUrl}auth/${service}`;
  }, 100);
};

class TwitchFollowsClips extends Component<IProps> {
  public page: number;

  constructor(props) {
    super(props);

    this.page = 0;
  }

  public render() {
    const { router } = this.props;

    return (
      <Box>
        <ChannelsBox>
          <Query
            query={GET_USER_TWITCH_FOLLOWS}
            fetchPolicy="network-only"
            variables={{
              limit: 100,
              offset: 0
            }}
          >
            {({ loading, error, data, fetchMore }) => {
              if (loading) {
                return null;
              }

              if (error || !data || !data.userTwitchFollows) {
                return null;
              }

              if (data.userTwitchFollows.count > 0) {
                const firstChannel = data.userTwitchFollows.follows[0].name;

                if (
                  !router.query.channel &&
                  firstChannel !== router.query.channel
                ) {
                  changeURLParams({ set: { channel: firstChannel } });
                }
              }

              this.page++;

              return (
                <div style={{ height: '100%', width: '100%' }}>
                  <SimpleBar>
                    <ChannelsCount>
                      Каналы - {data.userTwitchFollows.count}
                    </ChannelsCount>

                    <Channels>
                      {data.userTwitchFollows.follows.map(channel => (
                        <Channel
                          onClick={() =>
                            changeURLParams({ set: { channel: channel.name } })
                          }
                          active={router.query.channel === channel.name}
                          key={channel.name}
                        >
                          {channel.title}
                        </Channel>
                      ))}
                      {this.page * 100 <= data.userTwitchFollows.count && (
                        <LoadMoreChannels
                          onClick={() => {
                            fetchMore({
                              variables: {
                                offset: this.page * 100
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) {
                                  return prev;
                                }

                                this.page++;

                                return {
                                  ...prev,
                                  userTwitchFollows: {
                                    ...prev.userTwitchFollows,
                                    follows: [
                                      ...prev.userTwitchFollows.follows,
                                      ...fetchMoreResult.userTwitchFollows
                                        .follows
                                    ]
                                  }
                                };
                              }
                            });
                          }}
                        >
                          Показать еще
                        </LoadMoreChannels>
                      )}
                    </Channels>
                  </SimpleBar>
                </div>
              );
            }}
          </Query>
        </ChannelsBox>
        <ClipsBox>
          <Access
            allow={currentUser => !!currentUser}
            denyContent={
              <NoConnectTwitchAccount>
                <NoConnectTwitchAccountText>
                  Войдите через свой Twitch аккаунт чтобы видеть клипы по своим
                  подпискам
                </NoConnectTwitchAccountText>
                <Button mainColor="#7e5bbc" onClick={() => auth('twitch')}>
                  Войти через Twitch
                </Button>
              </NoConnectTwitchAccount>
            }
          >
            <div />
          </Access>
          <Access
            allow={currentUser => {
              return (
                currentUser.profiles.findIndex(profile => {
                  return profile.serviceName === 'twitch';
                }) < 0
              );
            }}
          >
            <NoConnectTwitchAccount>
              <NoConnectTwitchAccountText>
                Подлючите свой аккаунт Twitch чтобы видеть клипы по своим
                подпискам
              </NoConnectTwitchAccountText>
              <Button mainColor="#7e5bbc" onClick={() => connect('twitch')}>
                Подключить
              </Button>
            </NoConnectTwitchAccount>
          </Access>
          <ClipsTitle>
            Топ клипы канала {router.query.channel} за 24 часа
          </ClipsTitle>
          <SimpleBar>
            <Clips>
              {router.query.channel && (
                <Query
                  query={GET_TWITCH_CHANNEL_TOP_CLIPS}
                  fetchPolicy="network-only"
                  variables={{
                    channel: router.query.channel
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return <div>Загрузка...</div>;
                    }

                    if (error || !data || !data.twitchChannelTopClips) {
                      return error;
                    }

                    const curretClipIndex = data.twitchChannelTopClips.findIndex(
                      ({ id }) => {
                        return router.query.clip === id;
                      }
                    );

                    const clipsCount = data.twitchChannelTopClips.length;

                    const goPrev = () =>
                      changeURLParams({
                        set: {
                          clip:
                            data.twitchChannelTopClips[curretClipIndex - 1].id
                        }
                      });

                    const goNext = () =>
                      changeURLParams({
                        set: {
                          clip:
                            data.twitchChannelTopClips[curretClipIndex + 1].id
                        }
                      });

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
                          onClose={() => changeURLParams({ remove: ['clip'] })}
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
                              <ProgressiveImage
                                src={clip.thumbnails.small}
                                placeholder={clip.thumbnails.tiny}
                              >
                                {src => (
                                  <ClipPreviewImg
                                    src={src}
                                    alt=""
                                    onClick={() =>
                                      changeURLParams({
                                        set: { clip: clip.id }
                                      })
                                    }
                                  />
                                )}
                              </ProgressiveImage>
                            </ClipPreview>
                            <ClipTitle
                              onClick={() =>
                                changeURLParams({ set: { clip: clip.id } })
                              }
                              title={clip.title}
                            >
                              {clip.title}
                            </ClipTitle>
                            <ClipBottom>
                              <ClipViewsCount>
                                <Icon type="eye" />{' '}
                                {humanNumbers(clip.viewsCount)}
                              </ClipViewsCount>
                              <ClipDate>
                                {distanceInWordsToNow(
                                  +new Date(clip.createdAt),
                                  {
                                    locale: ruLocale
                                  }
                                )}
                                {' назад'}
                              </ClipDate>
                            </ClipBottom>
                          </Clip>
                        ))}
                      </>
                    );
                  }}
                </Query>
              )}
            </Clips>
          </SimpleBar>
        </ClipsBox>
      </Box>
    );
  }
}

export default withRouter(TwitchFollowsClips);
