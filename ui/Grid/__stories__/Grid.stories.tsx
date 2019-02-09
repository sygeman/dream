import { boolean, number } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { Grid } from '../';

const Item = ({ children }) => (
  <div
    style={{
      background: '#4d2c91',
      height: 50,
      margin: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </div>
);

storiesOf('UI/Grid', module).add('Grid', () => {
  const items = [
    ...new Array(
      number('Элементов', 30, { min: 1, max: 100, step: 1, range: true })
    )
  ];

  return (
    <Grid
      beforeRender={<div>before</div>}
      maxOnRow={number('Max элементов на линии', 6, {
        min: 1,
        max: 20,
        step: 1,
        range: true
      })}
      elementWidth={number('Ширина элемента', 100, {
        min: 1,
        max: 1000,
        step: 1,
        range: true
      })}
      items={items}
      itemRender={(item, i) => <Item key={i}>{i + 1}</Item>}
      maxRows={number('Max линий', 0, {
        min: 0,
        max: 5,
        step: 1,
        range: true
      })}
      afterRedner={<div>after</div>}
    />
  );
});
