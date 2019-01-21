import { text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ButtonFlat } from '../';

storiesOf('UI/Button', module).add('ButtonFlat', () => (
  <ButtonFlat>{text('Title', 'ButtonFlat')}</ButtonFlat>
));
