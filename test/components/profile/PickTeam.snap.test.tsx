/**
 * Snapshot test for the PickTeam component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import PickTeam from '../../../src/components/profile/PickTeam';
import { saintsXCTFTeamMember } from '../../test-utils/teamMocks';
import { Store } from 'redux';
import { emptyStore } from '../../test-utils/storeMocks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('PickTeam Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <PickTeam
            team={saintsXCTFTeamMember}
            onMembershipTagClick={(): void => null}
            joined={true}
            left={false}
            groupJoinRequests={new Set()}
            groupLeaveRequests={new Set()}
            setGroupJoinRequests={null}
            setGroupLeaveRequests={null}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
