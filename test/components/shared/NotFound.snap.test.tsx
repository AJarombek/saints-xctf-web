/**
 * Snapshot test for the NotFound component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../../src/components/shared/NotFound';

describe('NotFound Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NotFound fullPage={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
