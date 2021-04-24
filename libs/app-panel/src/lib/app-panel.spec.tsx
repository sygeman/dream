import { render } from '@testing-library/react';

import AppPanel from './app-panel';

describe('AppPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppPanel />);
    expect(baseElement).toBeTruthy();
  });
});
