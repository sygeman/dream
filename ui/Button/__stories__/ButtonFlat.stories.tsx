import { text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { ButtonFlat } from '../';

storiesOf('UI/Button', module)
  .addDecorator(centered)
  .add('ButtonFlat', () => (
    <ButtonFlat>{text('Title', 'ButtonFlat')}</ButtonFlat>
  ));
