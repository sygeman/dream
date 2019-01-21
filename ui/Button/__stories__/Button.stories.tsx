import { color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Button } from '../';

storiesOf('UI/Button', module).add('Button', () => (
  <Button mainColor={color('Color', '#633FA4')}>
    {text('Title', 'Button')}
  </Button>
));
