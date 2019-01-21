import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Emoji } from '../';

storiesOf('UI/Emoji', module).add('Emoji', () => (
  <Emoji name={text('Name', 'BibleThump')} />
));
