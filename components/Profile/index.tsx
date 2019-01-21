import * as React from 'react';
import * as Blade from '../../ui/Blade';
import Integration from './Integration';

interface IProps {
  onClose: () => void;
}

interface IState {
  tab: string;
}

export default class Profile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'integration'
    };
  }

  public openTab = (tab: string) => {
    this.setState({ tab });
  };

  public render() {
    const { tab } = this.state;

    return (
      <Blade.Screen onClose={() => this.props.onClose()}>
        <Blade.Left>
          <Blade.MenuTitle>Настройки пользователя</Blade.MenuTitle>
          <Blade.Tab
            active={tab === 'integration'}
            onClick={() => this.openTab('integration')}
          >
            Интеграции
          </Blade.Tab>
        </Blade.Left>
        <Blade.Right>
          {tab === 'integration' && (
            <Blade.TabContent>
              <Blade.TabContentTitle>Интеграции</Blade.TabContentTitle>
              <Integration />
            </Blade.TabContent>
          )}
        </Blade.Right>
      </Blade.Screen>
    );
  }
}
