/**
 * Snapshot test for the DashboardSidePanel component.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { andy } from '../../test-utils/userMocks';
import DashboardSidePanel from '../../../src/components/dashboard/DashboardSidePanel';

const mockStore = configureStore([thunk]);

describe('DashboardSidePanel Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <DashboardSidePanel
              notificationInfo={{
                items: [],
                newNotification: {},
                updateNotifications: {}
              }}
              memberships={{ teams: [] }}
              user={andy}
            />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
