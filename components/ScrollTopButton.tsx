import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IStore } from '../lib/store';
import styled from '../theme';
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
  store?: IStore;
}

@inject('store')
@observer
class ScrollTopButton extends React.Component<IProps> {
  public scrollToTop() {
    document.getElementById('layoutContent').scrollTop = 0;
  }

  public render() {
    if (this.props.store.layoutScrollIsTop) {
      return null;
    }

    return (
      <ScrollButton
        title="Наверх"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <Icon type="chevron-up" />
      </ScrollButton>
    );
  }
}

export default ScrollTopButton;
