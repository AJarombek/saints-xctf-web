/**
 * Snapshot test for the FeatureFlag component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import { FeatureFlag } from '../../../src/components/shared/FeatureFlag';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <FeatureFlag flag="TEST">
      <p>Test</p>
    </FeatureFlag>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
