/**
 * Snapshot test for the Memberships component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Memberships from '../../../src/components/profile/Memberships/Memberships';

describe('Memberships Snapshot Tests', () => {
  it('renders correctly when leaving group', () => {
    const tree = renderer
      .create(
        <Memberships
          teamMemberships={{
            teams: [
              {
                team_name: 'admin',
                title: 'Admin',
                status: 'accepted',
                user: 'user',
                groups: []
              }
            ]
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
