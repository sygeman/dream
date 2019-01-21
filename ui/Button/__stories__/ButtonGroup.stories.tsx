import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button, ButtonGroup } from '../';

storiesOf('UI/Button', module).add('ButtonGroup', () => (
  <ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
));
