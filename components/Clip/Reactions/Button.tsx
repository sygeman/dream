import { FC } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { lighten } from 'polished';
import { Icon } from '../../../ui';

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

  i {
    font-size: 21px;
    color: ${({ theme, active }) =>
      active ? lighten(0.15, theme.main1Color) : theme.accent2Color};
  }
`;

const ReactionsCount = styled('div')<IReactionButton>`
  color: ${({ theme, active }) =>
    active ? lighten(0.15, theme.main1Color) : theme.accent2Color};
  margin-left: 10px;
  font-weight: 500;
  user-select: none;
`;

interface IProps {
  onClick: () => any;
  active: boolean;
  icon: string;
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
      <Icon type={icon} />
    </ReactionButton>
    {count > 0 && <ReactionsCount active={active}>{count}</ReactionsCount>}
  </Box>
);
