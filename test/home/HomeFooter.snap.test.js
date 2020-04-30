/**
 * Snapshot test for the {@link ../../src/client/home/HomeFooter} component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import HomeFooter from '../../src/home/HomeFooter';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeFooter />).toJSON();
  expect(tree).toMatchSnapshot();
});
