/**
 * Unit tests with Jest and Enzyme for the {@link ../../src/client/pages/Home} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import {mount} from 'enzyme';
import Home from '../../src/containers/Home';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

let mockDay = 1;
jest.mock('moment', () => {
  return () => {
    return {
      dayOfYear: () => mockDay
    };
  };
});

describe('Home Unit Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {}
    });
  });

  it('renders', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Home/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("shows men's background picture on even days", () => {
    mockDay = 2;
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Home/>
        </Provider>
      </MemoryRouter>
    );

    const img = wrapper.find('.sxctf-home-background-img');
    expect(img.prop('src')).toEqual('https://asset.saintsxctf.com/mens-background.jpg');
  });

  it("shows women's background picture on odd days", () => {
    mockDay = 1;
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Home/>
        </Provider>
      </MemoryRouter>
    );

    const img = wrapper.find('.sxctf-home-background-img');
    console.info(img.debug());
    console.info(img.debug());
    expect(img.prop('src')).toEqual('https://asset.saintsxctf.com/womens-background.jpg');
  });
});
