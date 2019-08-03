import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    name: 'PepegaCom',
    theme: themes.dark
  }
});

addDecorator(withKnobs);

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
