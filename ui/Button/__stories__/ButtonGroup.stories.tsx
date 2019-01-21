import { withTests } from '@storybook/addon-jest';
import * as React from 'react';
import results from '../../../.jest-test-results.json';

import { storiesOf } from '@storybook/react';
import { Button, ButtonGroup } from '../';

storiesOf('UI/Button', module)
  .addDecorator(withTests({ results }))
  .add(
    'ButtonGroup',
    () => (
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    ),
    {
      jest: ['ButtonGroup.test.tsx']
    }
  );
