import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: none;
  background: ${({ theme }) => '#1D1E31'};
  border-radius: 4px;
  color: ${({ theme }) => '#EEEEEE'};
  outline: none;
  width: 100%;
  font-size: 13px;
`;
