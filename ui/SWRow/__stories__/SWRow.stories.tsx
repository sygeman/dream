import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { SWRow } from '../';

storiesOf('UI', module).add('SWRow', () => (
  <div style={{ width: '400px', background: '#333' }}>
    <SWRow
      title={text('Title', 'Title')}
      description={text('Description', 'Description')}
      isActive={boolean('Active', true)}
      onChange={() => undefined}
      bgColor={color('Color', '#633EA4')}
    />
  </div>
));
