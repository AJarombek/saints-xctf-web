/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/HomeNavBar} component.
 * @author Andrew Jarombek
 * @since 3/20/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import HomeNavBar from '../../../src/client/home/HomeNavBar';
import { useHistory } from 'react-router-dom';

// Mock react router's useHistory() hook before the tests execute.
jest.mock('react-router-dom', () => {
  const historyObj = {
    push: jest.fn()
  };

  return {
    ...jest.requireActual('react-router-dom'),
    useHistory: () => historyObj
  }
});

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<HomeNavBar />);
    expect(wrapper.exists()).toBe(true);
  });

});

describe('integration tests', () => {

  it('renders', () => {
    const pushSpy = jest.spyOn(useHistory(), 'push').mockImplementation();
    const wrapper = mount(<HomeNavBar />);

    const websiteLogo = wrapper.find('.sxctf-logo').childAt(0);
    const websiteTitle = wrapper.find('.sxctf-home-nav-bar').childAt(1);

    expect(websiteLogo.type()).toEqual('img');
    expect(websiteTitle.type()).toEqual('h1');

    expect(pushSpy).not.toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(0);

    websiteLogo.simulate('click');

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith('#');

    websiteTitle.simulate('click');

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(2);
    expect(pushSpy).toHaveBeenCalledWith('#');
  });

});
