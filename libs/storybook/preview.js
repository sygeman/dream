import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import raveproTheme from '@pepega/ui/theme/ravepro';

addDecorator(withKnobs);

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={raveproTheme}>
      <Story />
    </ThemeProvider>
  ),
];
