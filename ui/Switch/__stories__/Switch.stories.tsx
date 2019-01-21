import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Switch } from '../';

storiesOf('UI', module).add('Switch', () => (
  <Switch
    checked={boolean('Checked', true)}
    onChange={() => undefined}
    activeColor={color('Active Color', '#633EA4')}
    inactiveColor={color('Inactive Color', undefined)}
  />
));
