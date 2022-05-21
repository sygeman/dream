import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { lighten } from 'polished';

const Box = styled.div`
  height: 100%;
  padding: 0 16px;
  align-items: center;
  font-size: 14px;
  display: flex;
`;

interface IReactionButton {
  active: boolean;
}

const ReactionButtonAnim = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 1.5 },
  pressEnd: { scale: 1 }
});

const ReactionButton = styled(ReactionButtonAnim)<IReactionButton>`
  display: flex;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

  svg {
    fill: ${({ theme, active }) =>
      active ? lighten(0.15, theme.colors.primary) : theme.colors.accent};
  }
`;

const ReactionsCount = styled('div')<IReactionButton>`
  color: ${({ theme, active }) =>
    active ? lighten(0.15, theme.colors.primary) : theme.colors.accent};
  margin-left: 10px;
  font-weight: 500;
  user-select: none;
`;

interface IProps {
  onClick: () => any;
  active: boolean;
  icon: ReactNode;
  count: number;
}

export const ClipReactionButton: FC<IProps> = ({
  onClick,
  active,
  icon,
  count
}) => (
  <Box>
    <ReactionButton active={active} onClick={() => onClick()}>
      {icon}
    </ReactionButton>
    {count > 0 && <ReactionsCount active={active}>{count}</ReactionsCount>}
  </Box>
);
