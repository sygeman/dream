import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Icon } from '../';

storiesOf('UI', module).add('Icon', () => (
  <Icon type={text('Type', 'twitch')} />
));
