import { render } from '@testing-library/react';

import UtilsUseDarkMode from './utils-use-dark-mode';

describe('UtilsUseDarkMode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UtilsUseDarkMode />);
    expect(baseElement).toBeTruthy();
  });
});
