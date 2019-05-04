import * as React from 'react';
import centered from '@storybook/addon-centered/react';

import { storiesOf } from '@storybook/react';
import { Button, ButtonGroup } from '../';

storiesOf('UI/Button', module)
  .addDecorator(centered)
  .add('ButtonGroup', () => (
    <ButtonGroup>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  ));
