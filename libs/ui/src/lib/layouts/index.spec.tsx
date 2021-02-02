import React from 'react';
import { render } from '@testing-library/react';

import { RaveProLayout } from './RavePro';

describe('RaveProLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RaveProLayout />);
    expect(baseElement).toBeTruthy();
  });
});
