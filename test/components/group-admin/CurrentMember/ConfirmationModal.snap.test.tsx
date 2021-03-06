/**
 * Snapshot test for the ConfirmationModal component.
 * @author Andrew Jarombek
 * @since 3/5/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Store } from 'redux';
import { emptyStore } from '../../../test-utils/storeMocks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConfirmationModal from '../../../../src/components/group-admin/CurrentMember/ConfirmationModal';
import { alumni } from '../../../test-utils/groupMocks';

const mockStore = configureStore([thunk]);

describe('ConfirmationModal Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      ...emptyStore,
      groups: {
        group: {
          1: alumni
        },
        members: {},
        stats: {},
        leaderboards: {},
        team: {},
        uploadingGroupPicture: {},
        updating: {}
      }
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConfirmationModal
            onClose={(): void => null}
            onRemove={(): void => null}
            onDemote={(): void => null}
            show={true}
            isConfirming={false}
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
