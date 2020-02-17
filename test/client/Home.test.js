/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/Home} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from '../../src/client/pages/Home';

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBe(true);
  });
});
