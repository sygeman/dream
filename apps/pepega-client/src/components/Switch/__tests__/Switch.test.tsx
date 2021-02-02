/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Switch } from '../';

describe('Switch', () => {
  it('should render correctly', () => {
    const wrapper = render(<Switch>Switch</Switch>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() => renderer.create(<Switch>Switch</Switch>)).not.toThrow();
  });
});
