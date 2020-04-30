/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/HomeNavBar} component.
 * @author Andrew Jarombek
 * @since 3/20/2020
 */

import React from 'react';
import {shallow, mount} from 'enzyme';
import HomeNavBar from '../../src/components/home/HomeNavBar';
import { useHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

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

// I hope you are healthy and doing okay, and that your loved ones are doing the same.  I'm
// guessing you are still able to spend this time with those you love,
// which makes me happy for you :).

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<HomeNavBar />);
    expect(wrapper.exists()).toBe(true);
  });

});

describe('integration tests', () => {

  it('has functional navigation buttons', () => {
    const pushSpy = jest.spyOn(useHistory(), 'push').mockImplementation();
    const wrapper = mount(<HomeNavBar />);

    const websiteLogo = wrapper.find('.sxctf-logo').childAt(0);
    const websiteTitle = wrapper.find('.sxctf-home-nav-bar').childAt(1);

    const navButtons = wrapper.find('.sxctf-nav-buttons');

    /**
     * Helper function to get a navigational button on the desktop website header.
     * @param index Index of the button as a child of sxctf-nav-buttons in the HTML.
     * @return {ShallowWrapper|ReactWrapper} The element in the button that has a click
     * listener attached.
     */
    const getNavButton = (index) => {
      return navButtons.childAt(index).childAt(0).childAt(0).childAt(0);
    };

    const aboutButton = getNavButton(0);
    const testimonialButton = getNavButton(1);
    const signupButton = getNavButton(2);
    const loginButton = getNavButton(3);

    const mobileAboutNav = wrapper.find('.aj-nav-list-item').at(0).childAt(0);
    const mobileTestimonialsNav = wrapper.find('.aj-nav-list-item').at(1).childAt(0);
    const mobileSignUpNav = wrapper.find('.aj-nav-list-item').at(2).childAt(0);
    const mobileLogInNav = wrapper.find('.aj-nav-list-item').at(3).childAt(0);
    const mobileLogoNav = wrapper.find('.aj-nav-list-item').at(4).childAt(0);

    expect(websiteLogo.type()).toEqual('img');
    expect(websiteTitle.type()).toEqual('h1');

    expect(aboutButton.hasClass('aj-text-button')).toBe(true);
    expect(testimonialButton.hasClass('aj-text-button')).toBe(true);
    expect(signupButton.hasClass('aj-outlined-button')).toBe(true);
    expect(loginButton.hasClass('aj-contained-button')).toBe(true);

    expect(pushSpy).not.toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(0);

    websiteLogo.simulate('click');

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith('#');

    websiteTitle.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(2);
    expect(pushSpy).toHaveBeenCalledWith('#');

    aboutButton.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(3);
    expect(pushSpy).toHaveBeenCalledWith('/#about');

    testimonialButton.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(4);
    expect(pushSpy).toHaveBeenCalledWith('/#testimonials');

    signupButton.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(5);
    expect(pushSpy).toHaveBeenCalledWith('/signup');

    loginButton.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(6);
    expect(pushSpy).toHaveBeenCalledWith('/login');

    mobileAboutNav.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(7);
    expect(pushSpy).toHaveBeenCalledWith('/#about');

    mobileTestimonialsNav.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(8);
    expect(pushSpy).toHaveBeenCalledWith('/#testimonials');

    mobileSignUpNav.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(9);
    expect(pushSpy).toHaveBeenCalledWith('/signup');

    mobileLogInNav.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(10);
    expect(pushSpy).toHaveBeenCalledWith('/login');

    mobileLogoNav.simulate('click');

    expect(pushSpy).toHaveBeenCalledTimes(11);
    expect(pushSpy).toHaveBeenCalledWith('#');
  });

  it('has a working mobile dropdown', () => {
    const wrapper = mount(<HomeNavBar />);

    const getNavDropdownVisible = () =>
      wrapper
        .find('.sxctf-nav-dropdown')
        .hasClass('sxctf-nav-dropdown-visible');

    const getHamburgerInactive = () =>
      wrapper
        .find('.aj-mobile-hamburger')
        .childAt(0)
        .childAt(0)
        .hasClass('aj-mobile-hamburger-inactive');

    const getHamburgerActive = () =>
      wrapper
        .find('.aj-mobile-hamburger')
        .childAt(0)
        .childAt(0)
        .hasClass('aj-mobile-hamburger-active');

    expect(getNavDropdownVisible()).toBe(false);
    expect(getHamburgerInactive()).toBe(true);
    expect(getHamburgerActive()).toBe(false);

    wrapper.find('.aj-mobile-hamburger').simulate('click');

    expect(getNavDropdownVisible()).toBe(true);
    expect(getHamburgerInactive()).toBe(false);
    expect(getHamburgerActive()).toBe(true);
  });

  it('hashRoute function works as expected', () => {
    const wrapper = mount(<HomeNavBar/>);
    const pushSpy = jest.spyOn(useHistory(), 'push').mockImplementation();

    window.location.hash = '#about';

    const aboutButton =
      wrapper.find('.sxctf-nav-buttons').childAt(0).childAt(0).childAt(0).childAt(0);

    aboutButton.simulate('click');
    expect(pushSpy).toHaveBeenCalledWith('/#about');
  });

  it('hashRoute function works as expected', () => {
    const wrapper = mount(<HomeNavBar/>);
    const pushSpy = jest.spyOn(useHistory(), 'push').mockImplementation();
    const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockImplementation();

    window.location.hash = '#about';

    const aboutButton =
      wrapper.find('.sxctf-nav-buttons').childAt(0).childAt(0).childAt(0).childAt(0);

    expect(getElementByIdSpy).not.toHaveBeenCalled();
    expect(getElementByIdSpy).toHaveBeenCalledTimes(0);

    aboutButton.simulate('click');

    expect(pushSpy).toHaveBeenCalledWith('/#about');

    expect(getElementByIdSpy).toHaveBeenCalled();
    expect(getElementByIdSpy).toHaveBeenCalledTimes(1);
    expect(getElementByIdSpy).toHaveBeenCalledWith('about');
  });

  it('hashRoute function works as expected and scrolls', () => {
    const wrapper = mount(<HomeNavBar/>);

    const elementMock = {
      scrollIntoView: jest.fn()
    };

    const scrollIntoViewSpy = jest.spyOn(elementMock, 'scrollIntoView');

    const getElementByIdSpy = jest.spyOn(document, 'getElementById')
      .mockImplementation(() => elementMock);

    window.location.hash = '#about';

    const aboutButton =
      wrapper.find('.sxctf-nav-buttons').childAt(0).childAt(0).childAt(0).childAt(0);

    aboutButton.simulate('click');

    expect(getElementByIdSpy).toHaveBeenCalled();
    expect(getElementByIdSpy).toHaveBeenCalledWith('about');

    expect(scrollIntoViewSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

});
