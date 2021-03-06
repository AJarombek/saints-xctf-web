/**
 * Snapshot test for the ManageUsers component.
 * @author Andrew Jarombek
 * @since 3/5/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ManageUsers from '../../../src/components/group-admin/ManageUsers';

const mockStore = configureStore([thunk]);

describe('ManageUsers Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ManageUsers groupId={1} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
