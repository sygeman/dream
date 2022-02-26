import { render } from '@testing-library/react';
import { ChannelSettings } from './channel-settings';

describe('ChannelSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChannelSettings />);
    expect(baseElement).toBeTruthy();
  });
});
