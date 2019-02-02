import { boolean, color, number, text } from '@storybook/addon-knobs';
import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { VideoPreview } from '../';

storiesOf('UI/VideoPreview', module).add('Basic', () => (
  <div style={{ width: number('Width', 400) }}>
    <VideoPreview
      nsfw={boolean('nsfw', false)}
      spoiler={boolean('spoiler', false)}
      cover={text(
        'Cover',
        'https://media1.tenor.com/images/1c0898cab0f03d6d7217564257fb3603/tenor.gif?itemid=7562274'
      )}
      date={text('Date', 'Сейчас')}
      views={text('Views', '1 000')}
    />
  </div>
));

storiesOf('UI/VideoPreview', module).add('No Data', () => (
  <div style={{ width: number('Width', 400) }}>
    <VideoPreview />
  </div>
));
