/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { ButtonCommon } from '../ButtonCommon';

describe('ButtonCommon', () => {
  it('should render correctly', () => {
    const wrapper = render(<ButtonCommon>ButtonCommon</ButtonCommon>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() =>
      renderer.create(<ButtonCommon>ButtonCommon</ButtonCommon>)
    ).not.toThrow();
  });
});
