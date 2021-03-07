/**
 * Snapshot test for the WeekTotal component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import WeekTotal from '../../../src/components/profile/WeekTotal/WeekTotal';

describe('WeekTotal Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <WeekTotal
          rangeViewItems={[
            {
              date: '2021-03-02',
              feel: 5,
              miles: 4.5
            },
            {
              date: '2021-03-03',
              feel: 5,
              miles: 5.45
            },
            {
              date: '2021-03-04',
              feel: 5,
              miles: 5.45
            },
            {
              date: '2021-03-05',
              feel: 7,
              miles: 6.3
            },
            {
              date: '2021-03-06',
              feel: 6,
              miles: 6.01
            },
            {
              date: '2021-03-07',
              feel: 5,
              miles: 8.5
            }
          ]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
