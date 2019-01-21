import { withTests } from '@storybook/addon-jest';
import { color, text } from '@storybook/addon-knobs';
import * as React from 'react';
import results from '../../../.jest-test-results.json';

import { storiesOf } from '@storybook/react';
import { Button } from '../';

storiesOf('UI/Button', module)
  .addDecorator(withTests({ results }))
  .add(
    'Button',
    () => (
      <Button mainColor={color('Color', '#633FA4')}>
        {text('Title', 'Button')}
      </Button>
    ),
    {
      jest: ['Button.test.tsx']
    }
  );
