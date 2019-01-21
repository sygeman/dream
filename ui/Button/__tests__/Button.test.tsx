/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../';

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = render(<Button>Button</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() => renderer.create(<Button>Button</Button>)).not.toThrow();
  });
});
