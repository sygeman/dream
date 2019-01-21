import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from '../theme';

const GlStyle = createGlobalStyle`${GlobalStyle}`;

function withGlobalStyles(storyFn) {
  return (
    <>
      <GlStyle />
      {storyFn()}
    </>
  );
}

addDecorator(
  withOptions({
    name: 'TwitchRu',
    theme: themes.dark,
    downPanelInRight: true
  })
);

addDecorator(withGlobalStyles);

addDecorator(
  withThemesProvider([
    {
      name: 'Default',
      dark1Color: '#1E1D22',
      dark2Color: '#25222C',
      accent1Color: '#394158',
      accent2Color: '#968a9d',
      main1Color: '#633FA4',
      main2Color: '#52289F',
      text1Color: '#eee'
    }
  ])
);

// automatically import all files ending in *.stories.tsx
const req = require.context('../', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
