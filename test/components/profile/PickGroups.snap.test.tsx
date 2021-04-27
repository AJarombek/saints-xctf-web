/**
 * Snapshot test for the PickGroups component.
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
import PickGroups from '../../../src/components/profile/PickGroups';
import { alumniMember } from '../../test-utils/groupMocks';

const mockStore = configureStore([thunk]);

describe('PickGroups Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly when leaving group', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PickGroups
            groups={[alumniMember]}
            groupJoinRequests={new Set()}
            groupLeaveRequests={new Set()}
            setGroupJoinRequests={null}
            setGroupLeaveRequests={null}
            setChangesMade={null}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
