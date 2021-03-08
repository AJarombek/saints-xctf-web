/**
 * Snapshot test for the LoadingSpinner component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import LoadingSpinner from '../../../src/components/shared/LoadingSpinner';

describe('LoadingSpinner Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoadingSpinner className="customClass" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
