/**
 * Snapshot test for the StatisticSection component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import StatisticSection from '../../../src/components/shared/StatisticSection/StatisticSection';
import { milesStats } from '../../test-utils/statsMocks';

describe('StatisticSection Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <>
          <StatisticSection stats={milesStats} title="Statistic Section Snapshot" />
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
