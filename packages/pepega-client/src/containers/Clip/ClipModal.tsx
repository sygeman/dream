import { FC } from 'react';
import styled from 'styled-components';
import { Clip } from './Clip';

const Box = styled.div`
  width: 1000px;
`;

interface IProps {
  clipId: string;
}

export const ClipModal: FC<IProps> = ({ clipId }) => {
  return (
    <Box>
      <Clip clipId={clipId} autoPlay />
    </Box>
  );
};
