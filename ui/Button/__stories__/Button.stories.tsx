import { withTests } from '@storybook/addon-jest';
import * as React from 'react';
import results from '../../../.jest-test-results.json';

import { storiesOf } from '@storybook/react';
import { Button } from '../';

storiesOf('UI/Button', module)
  .addDecorator(withTests({ results }))
  .add('Button', () => <Button>Button</Button>, {
    jest: ['Button.test.tsx']
  });
