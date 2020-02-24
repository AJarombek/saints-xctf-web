/**
 * Snapshot test for the {@link ../../src/client/home/HomeNavBar} component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import HomeNavBar from '../../../src/client/home/HomeNavBar';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeNavBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
