/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/HomeBody} component.
 * @author Andrew Jarombek
 * @since 2/20/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import HomeBody from '../../src/components/home/HomeBody';

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<HomeBody />);
    expect(wrapper.exists()).toBe(true);
  });
});
