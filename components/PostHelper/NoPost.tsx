import { FC } from 'react';
import styled from '../../theme';

const Box = styled.div`
  padding: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoPost: FC = () => <Box>Пост более недоступен.</Box>;

export default NoPost;
