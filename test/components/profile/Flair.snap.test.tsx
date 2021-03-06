/**
 * Snapshot test for the Flair component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Flair from '../../../src/components/profile/Flair/Flair';

describe('Flair Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Flair
          flair={{
            items: [
              {
                flair: 'Sample Flair',
                flair_id: 1,
                username: 'andy'
              }
            ]
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
