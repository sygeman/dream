import React from 'react';
import { render } from '@testing-library/react';

import ModsTwitchStreamUi from './mods-twitch-stream-ui';

describe('ModsTwitchStreamUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModsTwitchStreamUi />);
    expect(baseElement).toBeTruthy();
  });
});
