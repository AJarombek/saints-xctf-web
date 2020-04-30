/**
 * Snapshot test for the {@link ../../src/client/home/HomeAbout} component.
 * @author Andrew Jarombek
 * @since 2/18/2020
 */

import React from 'react';
import HomeAbout from '../../src/components/home/HomeAbout';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeAbout />).toJSON();
  expect(tree).toMatchSnapshot();
});
