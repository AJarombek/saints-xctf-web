/**
 * Snapshot test for the Month component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Month from '../../../src/components/profile/Month/Month';

describe('Month Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Month
          rangeView={{
            items: [
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
              }
            ]
          }}
          start={moment('2021-03-01')}
          monthStart={moment('2021-03-01')}
          monthEnd={moment('2021-03-31')}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
