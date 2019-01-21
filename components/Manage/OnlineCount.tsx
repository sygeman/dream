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
    const dates = this.props.history.map(r => r.date);
    const counts = this.props.history.map(r => r.count);
    const counts2 = this.props.history.map(r => r.usersCount);

    return (
      <DashCount
        title="В сети"
        count={this.props.count}
        count2={this.props.count2}
        xData={dates}
        yData={counts}
        y2Data={counts2}
        chart
      />
    );
  }
}

export default OnlineCount;
