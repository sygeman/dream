import { lighten } from 'polished';
import * as React from 'react';
import styled from '../../theme';
import Group from './Group';

interface IButtonCommon {
  isIn: boolean;
  isGroup: boolean;
  isFirst: boolean;
  isLast: boolean;
  mainColor: string;
}

interface IButtonContained extends IButtonCommon {
  mainColor: string;
}

const ButtonCommon = styled('div')<IButtonCommon>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 14px;
  height: 32px;
  font-size: 12.5px;
  border-top-left-radius: ${({ isFirst }) => (isFirst ? '3px' : '0')};
  border-top-right-radius: ${({ isLast }) => (isLast ? '3px' : '0')};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? '3px' : '0')};
  border-bottom-left-radius: ${({ isFirst }) => (isFirst ? '3px' : '0')};
  ${({ isGroup }) => !isGroup && `border-radius: 3px;`} cursor: pointer;

  border: none;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;

  i {
    font-size: 20px;
  }
`;

const ButtonFlat = styled(ButtonCommon)`
  color: ${({ theme }) => theme.accent2Color};

  :focus {
    color: ${({ theme }) => lighten('0.2', theme.accent2Color)};
  }

  :hover {
    color: ${({ theme }) => lighten('0.2', theme.accent2Color)};
  }
`;

const ButtonContained = styled(ButtonCommon)<IButtonContained>`
  background: ${({ mainColor }) => mainColor};
  color: ${({ mainColor }) => lighten('0.45', mainColor)};

  :focus {
    background: ${({ mainColor }) => lighten('0.05', mainColor)};
  }

  :hover {
    background: ${({ mainColor }) => lighten('0.1', mainColor)};
  }
`;

interface IProps {
  color: string;
  isGroup: boolean;
  isFirst: boolean;
  isLast: boolean;
  flat: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default class extends React.Component<IProps> {
  public static defaultProps: IProps = {
    color: '#633FA4',
    isGroup: false,
    isFirst: false,
    isLast: false,
    flat: false
  };

  public static Group = Group;

  public render() {
    const { color, isGroup, isFirst, isLast, flat } = this.props;

    if (flat) {
      return (
        <ButtonFlat
          {...this.props}
          isIn={isGroup && !isFirst && !isLast}
          mainColor=""
        >
          {this.props.children}
        </ButtonFlat>
      );
    }

    return (
      <ButtonContained
        {...this.props}
        isIn={isGroup && !isFirst && !isLast}
        mainColor={color}
      >
        {this.props.children}
      </ButtonContained>
    );
  }
}
