/**
 * Snapshot test for the Register component.
 * @author Andrew Jarombek
 * @since 3/11/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { emptyStore } from '../../test-utils/storeMocks';
import { Store } from 'redux';
import Register from '../../../src/containers/Register';

const mockStore = configureStore([thunk]);

// If the path you want to live your life on continues to lead you further away from me that is okay.  I'll still be at
// peace knowing you are doing what makes you happy & loving who you want to.

describe('Register Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Register />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
