/**
 * Snapshot test for the Day component.
 * @author Andrew Jarombek
 * @since 3/6/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Day from '../../../src/components/profile/Day/Day';
import moment from 'moment';

describe('Day Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Day
          date={moment('2021-03-06')}
          monthStart={moment('2021-03-01')}
          monthEnd={moment('2021-03-31')}
          feel={6}
          miles={5.4}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
