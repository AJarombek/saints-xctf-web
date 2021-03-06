/**
 * Snapshot test for the GroupMembershipModal component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import GroupMembershipModal from '../../../src/components/profile/GroupMembershipModal/GroupMembershipModal';

describe('GroupMembershipModal Snapshot Tests', () => {
  it('renders correctly when joining group', () => {
    const tree = renderer
      .create(
        <GroupMembershipModal
          group={{
            group_id: 1,
            group_name: 'alumni',
            group_title: 'Alumni',
            status: 'accepted',
            user: 'user'
          }}
          onClose={(): void => null}
          onJoin={(): void => null}
          onLeave={(): void => null}
          show={true}
          joinedGroup={true}
          leftGroup={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when leaving group', () => {
    const tree = renderer
      .create(
        <GroupMembershipModal
          group={{
            group_id: 1,
            group_name: 'alumni',
            group_title: 'Alumni',
            status: 'accepted',
            user: 'user'
          }}
          onClose={(): void => null}
          onJoin={(): void => null}
          onLeave={(): void => null}
          show={true}
          joinedGroup={false}
          leftGroup={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
