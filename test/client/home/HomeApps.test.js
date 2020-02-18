/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/HomeApps} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import HomeApps from '../../../src/client/home/HomeApps';

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<HomeApps />);
    expect(wrapper.exists()).toBe(true);
  });
});
