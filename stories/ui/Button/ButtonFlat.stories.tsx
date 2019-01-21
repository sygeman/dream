import { withTests } from '@storybook/addon-jest';
import * as React from 'react';
import results from '../../../.jest-test-results.json';

import { storiesOf } from '@storybook/react';
import { ButtonFlat } from '../../../ui/Button';

storiesOf('UI/Button', module)
  .addDecorator(withTests({ results }))
  .add('ButtonFlat', () => <ButtonFlat>ButtonFlat</ButtonFlat>, {
    jest: ['ButtonFlat.test.tsx']
  });
