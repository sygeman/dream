import { color, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../';

storiesOf('UI/Button', module)
  .addDecorator(centered)
  .add('Button', () => (
    <Button mainColor={color('Color', '#633FA4')}>
      {text('Title', 'Button')}
    </Button>
  ));
