import Link from 'next/link';
import styled from 'styled-components';
import { darken, lighten, rgba } from 'polished';
import { OndemandVideo } from 'styled-icons/material';

const AddIcon = styled(OndemandVideo)`
  color: ${({ theme }) => lighten(0.15, theme.colors.primary)};
`;

const StreamAddBox = styled.div`
  cursor: pointer;
  height: 100%;
  min-height: 150px;
  width: 100%;
  background: ${({ theme }) => rgba(darken(0.06, theme.colors.primary), 0.9)};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => rgba(darken(0.03, theme.colors.primary), 0.9)};
  }
`;

const StreamAddText = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: ${({ theme }) => lighten(0.4, theme.colors.primary)};
  letter-spacing: 0.06em;
  font-weight: 500;
  text-transform: uppercase;
`;

export const StreamAdd = () => (
  <Link href={`/promoter`} passHref>
    <StreamAddBox>
      <AddIcon size="32px" />
      <StreamAddText>Разместить стрим</StreamAddText>
    </StreamAddBox>
  </Link>
);
