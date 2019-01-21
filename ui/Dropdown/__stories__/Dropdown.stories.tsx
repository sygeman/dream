import { color, text } from '@storybook/addon-knobs';
import * as React from 'react';
import { Button } from '../../Button';

import { storiesOf } from '@storybook/react';
import { Dropdown } from '../';

storiesOf('UI/Dropdown', module).add('Dropdown', () => (
  <Dropdown
    onClick={() => undefined}
    overlay={<div>{text('Overlay', 'Overlay')}</div>}
  >
    <Button>{text('Trigger', 'Trigger')}</Button>
  </Dropdown>
));
