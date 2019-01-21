import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: none;
  background: ${({ theme }) => theme.dark1Color};
  border-radius: 4px;
  color: ${({ theme }) => theme.text1Color};
  outline: none;
  width: 100%;
  font-size: 13px;
`;
