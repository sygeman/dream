import { boolean, color, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Emoji } from '../';

storiesOf('UI', module)
  .addDecorator(centered)
  .add('Emoji', () => <Emoji name={text('Name', 'Pepega')} />);
