import { Component } from 'react';
import DashCount from './DashCount';

interface IHistoryRow {
  count: number;
  usersCount: number;
  date: number;
}

interface IProps {
  subscribeToOnlineCount: () => void;
  count: number;
  count2: number;
  history: IHistoryRow[];
}

class OnlineCount extends Component<IProps> {
  public componentDidMount() {
    this.props.subscribeToOnlineCount();
  }

  public render() {
    const { history, count, count2 } = this.props;

    return (
      <DashCount
        title="В сети"
        history={history.map(d => ({ ...d, name: d.date })).slice(-10)}
        count={count}
        count2={count2}
        chart
      />
    );
  }
}

export default OnlineCount;
