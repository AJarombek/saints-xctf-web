/**
 * Snapshot test for the GroupAdminBody component.
 * @author Andrew Jarombek
 * @since 3/5/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { alumni } from '../../test-utils/groupMocks';
import GroupAdminBody from '../../../src/components/group-admin/GroupAdminBody';

const mockStore = configureStore([thunk]);

describe('GroupAdminBody Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <GroupAdminBody group={alumni} groupId={1} />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
