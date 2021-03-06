/**
 * Snapshot test for the PendingMember component.
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
import PendingMember from '../../../src/components/group-admin/PendingMember';

const mockStore = configureStore([thunk]);

describe('PendingMember Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PendingMember
            member={{
              username: 'andy',
              first: 'Andy',
              last: 'Jarombek',
              member_since: '2016-12-23',
              user: 'admin',
              status: 'pending'
            }}
            groupId={1}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
