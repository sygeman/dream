import { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../ui/Icon';

const ScrollButton = styled.div`
  height: 40px;
  width: 40px;
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 20px;
  background: #633da6;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  cursor: pointer;

  i {
    font-size: 25px;
  }
`;

interface IProps {
  toTop: () => void;
  show: boolean;
}

const ScrollTopButton: FC<IProps> = ({ show, toTop }) => {
  if (!show) {
    return null;
  }

  return (
    <ScrollButton title="Наверх" onClick={() => toTop()}>
      <Icon type="chevron-up" />
    </ScrollButton>
  );
};

export default ScrollTopButton;
