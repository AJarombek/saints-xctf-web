/**
 * Snapshot test for the HomeApps component.
 * @author Andrew Jarombek
 * @since 2/18/2020
 */

import React from 'react';
import HomeApps from '../../../src/components/home/HomeApps';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeApps />).toJSON();
  expect(tree).toMatchSnapshot();
});
