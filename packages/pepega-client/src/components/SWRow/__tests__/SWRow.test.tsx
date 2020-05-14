/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { SWRow } from '../';

describe('SWRow', () => {
  it('should render correctly', () => {
    const wrapper = render(<SWRow title="Title">SWRow</SWRow>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() =>
      renderer.create(<SWRow title="Title">SWRow</SWRow>)
    ).not.toThrow();
  });
});
