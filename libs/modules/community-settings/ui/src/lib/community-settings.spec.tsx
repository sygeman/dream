import { render } from '@testing-library/react';
import { CommunitySettings } from './community-settings';

describe('CommunitySettingsModule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommunitySettings />);
    expect(baseElement).toBeTruthy();
  });
});
