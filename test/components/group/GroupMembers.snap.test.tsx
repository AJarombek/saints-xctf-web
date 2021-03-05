/**
 * Snapshot test for the GroupMembers component.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import GroupMembers from '../../../src/components/group/GroupMembers';

describe('GroupMembers Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <GroupMembers
            members={[
              {
                username: 'andy',
                first: 'Andy',
                last: 'Jarombek',
                member_since: '2016-12-23',
                user: 'admin',
                status: 'accepted'
              }
            ]}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
