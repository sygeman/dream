import gql from 'graphql-tag';
import { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import GameHistory from './GameHistory';

const GET_GAMES_HISTORY = gql`
  query gamesHistory {
    gamesHistory {
      id
    }
  }
`;

const GET_GAME = gql`
  query game($id: ID) {
    game(id: $id) {
      id
      betsSum
      winnerId
      createdAt
      endedAt
    }
  }
`;

const GAME_ENDED = gql`
  subscription gameEnded {
    gameEnded
  }
`;

const Box = styled.div`
  padding: 20px 0;
  margin: 0 auto;
  min-height: 120px;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-height: 120px;
`;

interface IProps {
  subscribeGameEnded: () => void;
  games: any;
}

class GamesHistory extends Component<IProps> {
  public componentDidMount() {
    this.props.subscribeGameEnded();
  }

  public render() {
    const { games } = this.props;

    return (
      <Rows>
        {games.map(game => (
          <Query key={game.id} query={GET_GAME} variables={{ id: game.id }}>
            {({ loading, error, data }) => {
              if (loading || error) {
                return null;
              }

              if (!data || !data.game) {
                return 'game not found';
              }

              return <GameHistory game={data.game} />;
            }}
          </Query>
        ))}
      </Rows>
    );
  }
}

const GamesHistoryContainer = () => (
  <Box>
    <Query query={GET_GAMES_HISTORY}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading || error) {
          return null;
        }

        if (!data || !data.gamesHistory) {
          return 'Games History not found';
        }

        return (
          <GamesHistory
            subscribeGameEnded={() =>
              subscribeToMore({
                document: GAME_ENDED,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }

                  const gameEndedId = subscriptionData.data.gameEnded;

                  return {
                    ...prev,
                    gamesHistory: [
                      ...prev.gamesHistory.slice(-2),
                      { id: gameEndedId, __typename: 'Game' }
                    ]
                  };
                }
              })
            }
            games={data.gamesHistory}
          />
        );
      }}
    </Query>
  </Box>
);

export default GamesHistoryContainer;
