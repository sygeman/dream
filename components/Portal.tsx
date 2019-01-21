import { Component } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  selector: string;
}

export default class Portal extends Component<IProps> {
  public element: any;

  public componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  public render() {
    if (this.element === undefined) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
