import { Component } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  selector: string;
}

export class Portal extends Component<IProps> {
  public element: any;

  public componentDidMount() {
    if (!document) {
      return;
    }

    if (!document.querySelector(`#${this.props.selector}`)) {
      const p = document.createElement('div');
      p.id = this.props.selector;
      document.body.appendChild(p);
    }

    this.element = document.querySelector(`#${this.props.selector}`);
    this.forceUpdate();
  }

  public render() {
    if (this.element === undefined) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
