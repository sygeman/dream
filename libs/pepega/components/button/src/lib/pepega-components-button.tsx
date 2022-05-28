import { lighten } from 'polished';
import styled from 'styled-components';

export const Button = styled('button')`
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
  border-radius: 4px;

  border: none;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;

  i {
    font-size: 20px;
  }

  background: #633fa4;
  color: ${() => lighten('0.45', '#633FA4')};

  :focus {
    background: ${() => lighten('0.05', '#633FA4')};
  }

  :hover {
    background: ${() => lighten('0.1', '#633FA4')};
  }
`;
