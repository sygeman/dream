import gql from 'graphql-tag';
import { lighten } from 'polished';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import posed from 'react-pose';
import styled from 'styled-components';
import { Icon } from '../../ui/Icon';
import { changeURLParams } from '../../utils/url';
import Access from '../Access';

const SET_LIKE_STATE = gql`
  mutation($postId: ID!) {
    setLikeState(postId: $postId) {
      count
      liked
    }
  }
`;

const LikeBox = styled.div`
  height: 100%;
  padding: 0 16px;
  align-items: center;
  display: flex;
`;

interface ILikeButton {
  active: boolean;
}

const LikeButtonAnim = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 1.3 },
  pressEnd: { scale: 1 }
});

const LikeButton = styled(LikeButtonAnim)<ILikeButton>`
  display: flex;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 15px;
    color: ${({ theme, active }) =>
      active ? lighten(0.3, theme.main1Color) : theme.accent2Color};
  }
`;

const LikesCount = styled('div')`
  color: ${({ theme }) => theme.accent2Color};
  font-weight: 500;
  user-select: none;
  font-size: 12px;
  margin-left: 10px;
`;

interface IProps {
  id: string;
  liked: boolean;
  likesCount: number;
}

export default class PostLike extends React.Component<IProps> {
  public render() {
    const { id, liked, likesCount } = this.props;

    return (
      <Access
        denyContent={
          <LikeBox onClick={() => changeURLParams({ set: { auth: 1 } })}>
            <LikeButton active={liked}>
              <Icon type={liked ? 'favorite' : 'favorite-outline'} />
            </LikeButton>
            {likesCount > 0 && (
              <LikesCount active={liked}>{likesCount}</LikesCount>
            )}
          </LikeBox>
        }
      >
        <Mutation mutation={SET_LIKE_STATE}>
          {setLikeState => (
            <LikeBox>
              <LikeButton
                active={liked}
                onClick={() =>
                  setLikeState({
                    variables: {
                      postId: id
                    }
                  })
                }
              >
                <Icon type={liked ? 'favorite' : 'favorite-outline'} />
              </LikeButton>
              {/* {likesCount > 0 && (
                <LikesCount active={liked}>{likesCount}</LikesCount>
              )} */}
            </LikeBox>
          )}
        </Mutation>
      </Access>
    );
  }
}
