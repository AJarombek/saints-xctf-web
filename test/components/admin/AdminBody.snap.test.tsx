/**
 * Snapshot test for the AdminBody component.
 * @author Andrew Jarombek
 * @since 3/3/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminBody from '../../../src/components/admin/AdminBody';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { andy } from '../../test-utils/userMocks';

const mockStore = configureStore([thunk]);

describe('AdminBody Empty Store Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <AdminBody user={andy} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('AdminBody Populated Store Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      ...emptyStore,
      profile: {
        users: {
          andy: {
            user: {
              ...andy,
              didInvalidate: false,
              isFetching: false,
              lastUpdated: 1629738681
            }
          }
        }
      }
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <AdminBody user={andy} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
