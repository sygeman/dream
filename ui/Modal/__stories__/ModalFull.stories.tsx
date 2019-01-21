import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ModalFull } from '../';
import { Button, ButtonGroup } from '../../Button';

storiesOf('UI/Modal', module).add('ModalFull', () => (
  <ModalFull isOpen={boolean('Open', true)}>
    <div>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    </div>
  </ModalFull>
));
