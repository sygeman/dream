import { FC } from 'react';
import Switch from '../components/Switch';
import styled from '../theme';

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.accent1Color};
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
`;

const SRowDescription = styled.div`
  padding-top: 5px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.accent2Color};
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
  title: string;
  description?: string;
  isActive: boolean;
  onChange: () => void;
  bgColor?: string;
}

const SWRow: FC<IProps> = ({
  title,
  description,
  isActive,
  onChange,
  bgColor
}) => (
  <Box>
    <SRowLeft>
      <SRowTitle>{title}</SRowTitle>
      {!!description && <SRowDescription>{description}</SRowDescription>}
    </SRowLeft>
    <SRowRight>
      <SRowSwitch>
        <Switch
          checked={isActive}
          bgColor={bgColor}
          onChange={() => onChange()}
        />
      </SRowSwitch>
    </SRowRight>
  </Box>
);

export default SWRow;
