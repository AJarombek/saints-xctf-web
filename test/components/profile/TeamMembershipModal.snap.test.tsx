/**
 * Snapshot test for the TeamMembershipsModal component.
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
import TeamMembershipsModal from '../../../src/components/profile/TeamMembershipModal';
import { saintsXCTFTeamMember } from '../../test-utils/teamMocks';

const mockStore = configureStore([thunk]);

describe('TeamMembershipsModal Snapshot Tests', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore(emptyStore);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TeamMembershipsModal
            team={saintsXCTFTeamMember}
            groupsJoined={new Set<string>()}
            groupsLeft={new Set<string>()}
            onClose={(): void => null}
            onJoin={(): void => null}
            onLeave={(): void => null}
            show={true}
            joinedTeam={true}
            leftTeam={false}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
