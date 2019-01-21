import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Input } from '../';

storiesOf('UI/Input', module).add('Input', () => (
  <div style={{ padding: 20, background: '#333' }}>
    <Input placeholder={text('Placeholder', 'placeholder')} />
  </div>
));
