import { render } from '@testing-library/react';

import ModeHostSpotifyUi from './mode-host-spotify-ui';

describe('ModeHostSpotifyUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModeHostSpotifyUi />);
    expect(baseElement).toBeTruthy();
  });
});
