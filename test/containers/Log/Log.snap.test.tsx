/**
 * Snapshot test for the Log component.
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
import Log from '../../../src/containers/Log';

const mockStore = configureStore([thunk]);

describe('Log Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Log />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
