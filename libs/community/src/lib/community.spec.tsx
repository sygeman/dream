import React from 'react';
import { render } from '@testing-library/react';

import Community from './community';

describe('Community', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Community />);
    expect(baseElement).toBeTruthy();
  });
});
