/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Input } from '../';

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = render(<Input defaultValue="Test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() => renderer.create(<Input defaultValue="Test" />)).not.toThrow();
  });
});
