/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { ButtonFlat } from '../ButtonFlat';

describe('ButtonFlat', () => {
  it('should render correctly', () => {
    const wrapper = render(<ButtonFlat>ButtonFlat</ButtonFlat>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() =>
      renderer.create(<ButtonFlat>ButtonFlat</ButtonFlat>)
    ).not.toThrow();
  });
});
