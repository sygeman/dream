import gql from 'graphql-tag';
import { RouterProps, withRouter } from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Icon } from '../../../ui/Icon';
import MenuSubItem from './SubItem';

const LoadMoreChannels = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 13px;
  color: ${({ theme }) => theme.accent2Color};
  background: ${({ theme }) => lighten(0.03, theme.dark2Color)};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => lighten(0.05, theme.dark2Color)};
  }

  i {
    font-size: 18px;
  }
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

interface IProps {
  router: RouterProps;
}

class Follows extends Component<IProps> {
  public page: number;
  public pageSize: number;

  constructor(props) {
    super(props);

    this.page = 0;
    this.pageSize = 20;
  }

  public render() {
    const { router } = this.props;

    return (
      <Query
        query={GET_USER_TWITCH_FOLLOWS}
        variables={{
          limit: this.pageSize,
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

          this.page++;

          return (
            <>
              <>
                {data.userTwitchFollows.follows.map(channel => (
                  <MenuSubItem
                    route={`/follows?channel=${channel.name}`}
                    active={router.query.channel === channel.name}
                    key={channel.name}
                  >
                    {channel.title}
                  </MenuSubItem>
                ))}
                {this.page * this.pageSize <= data.userTwitchFollows.count && (
                  <LoadMoreChannels
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: this.page * this.pageSize
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
                                ...fetchMoreResult.userTwitchFollows.follows
                              ]
                            }
                          };
                        }
                      });
                    }}
                  >
                    <Icon type="chevron-down" />
                  </LoadMoreChannels>
                )}
              </>
            </>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Follows);
