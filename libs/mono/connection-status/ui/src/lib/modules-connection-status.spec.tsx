import { render } from '@testing-library/react';

import ModulesConnectionStatus from './modules-connection-status';

describe('ModulesConnectionStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesConnectionStatus />);
    expect(baseElement).toBeTruthy();
  });
});
