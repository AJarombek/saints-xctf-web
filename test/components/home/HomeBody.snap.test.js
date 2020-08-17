/**
 * Snapshot test for the HomeBody component.
 * @author Andrew Jarombek
 * @since 2/20/2020
 */

import React from 'react';
import HomeBody from '../../../src/components/home/HomeBody';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeBody />).toJSON();
  expect(tree).toMatchSnapshot();
});
