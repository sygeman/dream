import styled from 'styled-components';

export const ButtonCommon = styled('div')`
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
  border-radius: 3px;
  cursor: pointer;

  border: none;
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;

  i {
    font-size: 20px;
  }
`;
