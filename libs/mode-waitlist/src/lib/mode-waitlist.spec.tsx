import React from 'react';
import { render } from '@testing-library/react';

import ModeWaitlist from './mode-waitlist';

describe('ModeWaitlist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModeWaitlist />);
    expect(baseElement).toBeTruthy();
  });
});
