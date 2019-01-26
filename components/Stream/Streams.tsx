import { Component } from 'react';
import styled from 'styled-components';
import Stream from './Stream';

const StreamBox = styled.div`
  padding: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

interface IProps {
  streams: any;
  manage: boolean;
  streamAdded: () => void;
  streamUpdated: () => void;
  streamRemoved: () => void;
}

class Streams extends Component<IProps> {
  public componentDidMount() {
    this.props.streamAdded();
    this.props.streamUpdated();
    this.props.streamRemoved();
  }

  public render() {
    return (
      <>
        {this.props.streams.map(stream => (
          <StreamBox key={stream.id}>
            <Stream stream={stream} manage={this.props.manage} />
          </StreamBox>
        ))}
      </>
    );
  }
}

export default Streams;
