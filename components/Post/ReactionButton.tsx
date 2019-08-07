import gql from 'graphql-tag';
import Router from 'next/router';
import { lighten } from 'polished';
import { FC } from 'react';
import { useMutation } from 'react-apollo';
import posed from 'react-pose';
import styled from 'styled-components';
import { Access } from '../../providers/Access';
import { Icon } from '../../ui';

const SET_POST_REACTION = gql`
  mutation setPostReaction($postId: ID!, $type: PostReactionType!) {
    setPostReaction(postId: $postId, type: $type)
  }
`;

const Box = styled.div`
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
    color: ${({ theme, active }) =>
      active ? lighten(0.15, theme.main1Color) : theme.accent2Color};
  }
`;

const LikesCount = styled('div')<ILikeButton>`
  color: ${({ theme, active }) =>
    active ? lighten(0.15, theme.main1Color) : theme.accent2Color};
  margin-left: 10px;
  font-weight: 500;
  user-select: none;
`;

interface IProps {
  id: string;
  icon: string;
  type: string;
  state: boolean;
  count: number;
}

export const PostReactionButton: FC<IProps> = ({
  id,
  type,
  icon,
  state,
  count
}) => {
  const [setPostReaction] = useMutation(SET_POST_REACTION);

  return (
    <Access
      denyContent={
        <Box
          onClick={() =>
            Router.push(
              {
                pathname: Router.route,
                query: {
                  ...Router.query,
                  authModal: 1
                }
              },
              `/auth?continue=${Router.asPath}`,
              { shallow: true }
            )
          }
        >
          <LikeButton active={state}>
            <Icon type={icon} />
          </LikeButton>
          {count > 0 && <LikesCount active={state}>{count}</LikesCount>}
        </Box>
      }
    >
      <Box>
        <LikeButton
          active={state}
          onClick={() =>
            setPostReaction({
              variables: {
                postId: id,
                type: state ? 'none' : type
              }
            })
          }
        >
          <Icon type={icon} />
        </LikeButton>
        {count > 0 && <LikesCount active={state}>{count}</LikesCount>}
      </Box>
    </Access>
  );
};
