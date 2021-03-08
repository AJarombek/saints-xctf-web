/**
 * Snapshot test for the FilterButtons component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import FilterButtons from '../../../src/components/shared/FilterButtons';

describe('FilterButtons Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <FilterButtons
          selectedFilters={{
            run: true,
            bike: false,
            swim: false,
            other: true
          }}
          setSelectedFilters={(): void => null}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
