/**
 * Snapshot test for the RegisterPersonalInfo component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import RegisterPersonalInfo from '../../../src/components/register/RegisterPersonalInfo';

const mockStore = configureStore([thunk]);

describe('RegisterPersonalInfo Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <RegisterPersonalInfo registration={{}} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
