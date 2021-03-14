import React from 'react';
import { render } from '@testing-library/react';

import { ChannelModeWaitlist } from './mode-waitlist';

describe('ModeWaitlist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelModeWaitlist />);
    expect(baseElement).toBeTruthy();
  });
});
