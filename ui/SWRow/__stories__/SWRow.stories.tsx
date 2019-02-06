import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { SWRow } from '../';

storiesOf('UI', module).add('SWRow', () => (
  <div style={{ width: '400px', background: '#333' }}>
    <SWRow
      title={text('Title', 'Title')}
      description={text('Description', 'Description')}
      active={boolean('Active', true)}
      onChange={() => undefined}
      activeColor={color('Color', '#633EA4')}
    />
  </div>
));
