import { boolean, color, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import * as Blade from '../';

storiesOf('UI', module).add('Blade', () => (
  <div style={{ width: 1500, height: 1000 }}>
    <Blade.Screen onClose={() => undefined}>
      <Blade.Left>
        <Blade.MenuTitle>Menu Title Group</Blade.MenuTitle>
        <Blade.Tab active onClick={() => undefined}>
          Tab Menu Item
        </Blade.Tab>
        <Blade.Tab onClick={() => undefined}>Tab Menu Item</Blade.Tab>
        <Blade.Divider />
        <Blade.Tab onClick={() => undefined}>Tab Menu Item</Blade.Tab>
        <Blade.Divider />
        <Blade.MenuTitle>Menu Title Group</Blade.MenuTitle>
        <Blade.Tab onClick={() => undefined}>Tab Menu Item</Blade.Tab>
        <Blade.Tab onClick={() => undefined}>Tab Menu Item</Blade.Tab>
        <Blade.Divider />
        <Blade.Tab onClick={() => undefined}>Tab Menu Item</Blade.Tab>
      </Blade.Left>
      <Blade.Right>
        <Blade.TabContent>
          <Blade.TabContentTitle>Tab Content Title</Blade.TabContentTitle>
          <div>Tab Content</div>
        </Blade.TabContent>
      </Blade.Right>
    </Blade.Screen>
  </div>
));
