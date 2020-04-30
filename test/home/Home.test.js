/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/Home} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from '../../src/components/home/Home';

let mockDay = 1;
jest.mock('moment', () => {
  return () => {
    return {
      dayOfYear: () => mockDay
    };
  };
});

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists()).toBe(true);
  });

  it("shows men's background picture on even days", () => {
    mockDay = 2;
    const wrapper = shallow(<Home />);

    const img = wrapper.find('img');
    expect(img.prop('src')).toEqual('https://asset.saintsxctf.com/mens-background.jpg');
  });

  it("shows women's background picture on odd days", () => {
    mockDay = 1;
    const wrapper = shallow(<Home />);

    const img = wrapper.find('img');
    expect(img.prop('src')).toEqual('https://asset.saintsxctf.com/womens-background.jpg');
  });
});
