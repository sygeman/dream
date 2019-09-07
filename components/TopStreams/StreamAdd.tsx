import Link from 'next/link';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Icon } from '../../ui';

const StreamAddBox = styled.div`
  cursor: pointer;
  height: 100%;
  min-height: 150px;
  width: 100%;
  background: ${({ theme }) => darken(0.04, theme.dark1Color)};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  i {
    font-size: 26px;
    color: ${({ theme }) => lighten(0.5, theme.dark1Color)};
  }
`;

const StreamAddText = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.5, theme.dark1Color)};
`;

export const StreamAdd = () => (
  <Link href={`/promoter`} passHref>
    <StreamAddBox>
      <Icon type="plus-circle-o" />
      <StreamAddText>Разместить стрим</StreamAddText>
    </StreamAddBox>
  </Link>
);
