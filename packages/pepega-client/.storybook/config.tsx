import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Orbitron:500|Roboto:300,400,500&subset=cyrillic-ext');

  html, body {
    font-family: 'Roboto', sans-serif;
  }
`;

addParameters({
  options: {
    name: 'PepegaUI',
    // theme: themes.dark,
    panelPosition: 'right'
  }
});

addDecorator(function(storyFn) {
  return (
    <>
      <GlobalStyle />
      {storyFn()}
    </>
  );
});

addDecorator(withKnobs);

// automatically import all files ending in *.stories.tsx
const req = require.context('../', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
