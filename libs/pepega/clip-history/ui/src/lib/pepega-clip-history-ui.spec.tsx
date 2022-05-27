import { render } from '@testing-library/react';

import PepegaClipHistoryUi from './pepega-clip-history-ui';

describe('PepegaClipHistoryUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PepegaClipHistoryUi />);
    expect(baseElement).toBeTruthy();
  });
});
