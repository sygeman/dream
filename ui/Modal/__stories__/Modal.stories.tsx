import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Modal } from '../';
import { Button, ButtonGroup } from '../../Button';

storiesOf('UI/Modal', module).add('Modal', () => (
  <Modal
    title={text('Title', 'Title')}
    isOpen={boolean('Open', true)}
    minimal={boolean('Minimal', false)}
  >
    <div>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    </div>
  </Modal>
));
