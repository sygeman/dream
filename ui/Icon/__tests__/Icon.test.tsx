/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Icon } from '../';

describe('Icon', () => {
  it('should render correctly', () => {
    const wrapper = render(<Icon type="google">Icon</Icon>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() =>
      renderer.create(<Icon type="google">Icon</Icon>)
    ).not.toThrow();
  });
});
