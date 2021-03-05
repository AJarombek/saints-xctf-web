/**
 * Snapshot test for the LeaderboardItem component.
 * @author Andrew Jarombek
 * @since 3/4/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import LeaderboardItem from '../../../src/components/group/LeaderboardItem';

describe('LeaderboardItem Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <LeaderboardItem item={{ username: 'andy', first: 'Andy', last: 'Jarombek', value: 40 }} leaderMiles={65} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
