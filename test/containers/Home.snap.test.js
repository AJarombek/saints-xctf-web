/**
 * Snapshot test for the {@link ../../src/client/home/Home} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import Home from '../../src/containers/Home';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

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

describe('Home Snapshot Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {}
    });
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
