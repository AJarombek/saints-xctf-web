/**
 * Snapshot test for the PaginationBar component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import PaginationBar from '../../../src/components/shared/PaginationBar';

describe('PaginationBar Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PaginationBar page={5} totalPages={10} onChangePage={(): void => null} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
