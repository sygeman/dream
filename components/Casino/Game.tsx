import format from 'date-fns/format';
import gql from 'graphql-tag';
import Router from 'next/router';
import { lighten } from 'polished';
import { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Access } from '../../helpers/Access';
import { Button } from '../../ui/Button';
import Bet from './Bet';

const PLACE_BET = gql`
  mutation placeBet($gameId: ID!, $betSize: Int!) {
    placeBet(gameId: $gameId, betSize: $betSize)
  }
`;

const TopData = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
  min-height: 80px;
`;

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TimerTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
`;

const TimerCurrent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  padding: 10px 0;
`;

const RewardBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 26px;
`;

const RewardTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
`;

const RewardCost = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  padding: 10px 0;
`;

const UserStatus = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BetPlaceButton = styled(Button)`
  font-size: 15px;
  height: 40px;

  span {
    margin-left: 10px;
  }
`;

const Bets = styled.div`
  background: ${({ theme }) => theme.dark1Color};
  padding: 10px 0;
`;

const InDeal = styled.div`
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
`;

interface IProps {
  game: any;
  userId: number;
  subscribeGameBetCreated: () => void;
}

interface IState {
  timer: number;
}

class Game extends Component<IProps, IState> {
  public interval;

  constructor(props) {
    super(props);

    this.state = {
      timer: 0
    };
  }

  public tickTimer() {
    const end = +new Date(parseInt(this.props.game.endedAt, 10));
    const diff = end - Date.now();
    this.setState({ timer: diff > 0 ? diff : 0 });
  }

  public componentDidMount() {
    this.props.subscribeGameBetCreated();
    this.interval = setInterval(() => this.tickTimer(), 100);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    const { game, userId } = this.props;
    const bets = game.bets ? game.bets : [];
    const inDeal = bets.findIndex(bet => bet.userId === userId) >= 0;

    return (
      <>
        <TopData>
          <TimerBox>
            <TimerTitle>До конца игры</TimerTitle>
            <TimerCurrent>{format(this.state.timer, 'mm:ss')}</TimerCurrent>
          </TimerBox>
          <RewardBox>
            <RewardTitle>Награда</RewardTitle>
            <RewardCost>{game.betsSum || 0}</RewardCost>
          </RewardBox>
          <UserStatus>
            <Access
              denyContent={
                <BetPlaceButton
                  onClick={() =>
                    Router.push(
                      {
                        pathname: Router.route,
                        query: {
                          ...Router.query,
                          authModal: 1
                        }
                      },
                      `/auth?continue=${Router.asPath}`,
                      { shallow: true }
                    )
                  }
                >
                  Присоединиться
                  <span>100</span>
                </BetPlaceButton>
              }
            >
              {!inDeal ? (
                <Mutation mutation={PLACE_BET}>
                  {placeBet => (
                    <BetPlaceButton
                      onClick={() =>
                        placeBet({
                          variables: { gameId: game.id, betSize: 100 }
                        })
                      }
                    >
                      Присоединиться
                      <span>100</span>
                    </BetPlaceButton>
                  )}
                </Mutation>
              ) : (
                <InDeal>Ваша ставка 100</InDeal>
              )}
            </Access>
          </UserStatus>
        </TopData>

        {bets.length > 0 && (
          <Bets>
            {bets.map(bet => (
              <Bet key={bet.id} bet={bet} />
            ))}
          </Bets>
        )}
      </>
    );
  }
}

export default Game;
