import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../ui/Icon';

const CommentsBox = styled.div`
  height: 100%;
  padding: 0 16px;
  align-items: center;
  font-size: 14px;
  display: flex;
  ${({ active }) => active && `cursor: pointer;`}
  color: ${({ theme }) => theme.accent2Color};

  i {
    font-size: 19px;
    padding: 0 5px;
  }
`;

const CommentsCount = styled.div`
  color: ${({ theme }) => theme.accent2Color};
  margin-left: 10px;
  font-weight: 500;
`;
interface IProps {
  commentsCount: number;
  onClick?: () => void;
}

const PostCommentsButton: FC<IProps> = ({ commentsCount, onClick }) => (
  <CommentsBox active={!!onClick} onClick={() => onClick && onClick()}>
    <Icon type="comment-text" />
    {commentsCount > 0 && <CommentsCount>{commentsCount}</CommentsCount>}
  </CommentsBox>
);

export default PostCommentsButton;
