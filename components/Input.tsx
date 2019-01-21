import styled from '../theme';

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: none;
  background: ${({ theme }) => theme.dark1Color};
  border-radius: 4px;
  color: #eee;
  outline: none;
  width: 100%;
  font-size: 13px;
`;

export default Input;
