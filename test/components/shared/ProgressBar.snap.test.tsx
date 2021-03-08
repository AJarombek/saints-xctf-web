/**
 * Snapshot test for the PaginationBar component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '../../../src/components/shared/ProgressBar';

describe('PaginationBar Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProgressBar progress={50} inProgress={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
