import * as React from 'react';
import styled from '../theme';
import Icon from './Icon';

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

interface IState {
  topPx: number;
}

class ScrollTopButton extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      topPx: 0
    };
  }

  public componentDidMount() {
    document.getElementById('layoutContent').addEventListener('scroll', () => {
      const scrollTop = document.getElementById('layoutContent').scrollTop;

      if (this.state.topPx !== scrollTop) {
        this.setState({ topPx: scrollTop });
      }
    });
  }

  public scrollToTop() {
    document.getElementById('layoutContent').scrollTop = 0;
  }

  public render() {
    if (this.state.topPx === 0) {
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
