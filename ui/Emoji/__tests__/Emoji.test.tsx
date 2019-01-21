/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Emoji } from '../';

describe('Emoji', () => {
  it('should render correctly', () => {
    const wrapper = render(<Emoji name="BibleThump" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() => renderer.create(<Emoji name="BibleThump" />)).not.toThrow();
  });
});
