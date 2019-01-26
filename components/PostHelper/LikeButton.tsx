import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import posed from 'react-pose';
import styled from 'styled-components';
import { Access } from '../../helpers/Access';
import { Icon } from '../../ui/Icon';
import { changeURLParams } from '../../utils/url';

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
  font-size: 14px;
  display: flex;
`;

interface ILikeButton {
  active: boolean;
}

const LikeButtonAnim = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 1.5 },
  pressEnd: { scale: 1 }
});

const LikeButton = styled(LikeButtonAnim)<ILikeButton>`
  display: flex;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

  i {
    font-size: 21px;
    color: ${({ theme, active }) => (active ? '#cc2939' : theme.accent2Color)};
  }
`;

const LikesCount = styled('div')<ILikeButton>`
  color: ${({ theme, active }) => (active ? '#cc2939' : theme.accent2Color)};
  margin-left: 10px;
  font-weight: 500;
  user-select: none;
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
              <Icon type="thumb-up" />
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
                <Icon type="thumb-up" />
              </LikeButton>
              {likesCount > 0 && (
                <LikesCount active={liked}>{likesCount}</LikesCount>
              )}
            </LikeBox>
          )}
        </Mutation>
      </Access>
    );
  }
}
