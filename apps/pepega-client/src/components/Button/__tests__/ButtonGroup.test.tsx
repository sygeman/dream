/* eslint-env jest */
import { mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button, ButtonGroup } from '../';
describe('ButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount correctly', () => {
    expect(() =>
      renderer.create(
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>
      )
    ).not.toThrow();
  });
});
