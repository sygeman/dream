import { darken } from 'polished';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Switch } from '../Switch';

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  /* border-bottom: 1px solid ${({ theme }) => theme.dark1Color}; */
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const SRowLeft = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 5px;
`;

const SRowTitle = styled.div`
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1Color};
`;

const SRowDescription = styled.div`
  padding-top: 5px;
  font-size: 12.5px;
  color: ${({ theme }) => darken(0.4, theme.text1Color)};
`;

const SRowRight = styled.div`
  margin-left: auto;
  height: 100%;
  min-width: 70px;
`;

const SRowSwitch = styled.div`
  padding: 10px;
`;

interface IProps {
  title: string | ReactNode;
  description?: string;
  active?: boolean;
  onChange?: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

export const SWRow: FC<IProps> = ({
  title,
  description,
  active,
  onChange,
  activeColor,
  inactiveColor
}) => (
  <Box>
    <SRowLeft>
      <SRowTitle>{title}</SRowTitle>
      {!!description && <SRowDescription>{description}</SRowDescription>}
    </SRowLeft>
    <SRowRight>
      <SRowSwitch>
        <Switch
          checked={active}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          onChange={() => onChange()}
        />
      </SRowSwitch>
    </SRowRight>
  </Box>
);
