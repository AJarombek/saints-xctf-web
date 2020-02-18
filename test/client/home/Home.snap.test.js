/**
 * Snapshot test for the {@link ../../src/client/home/Home} component.
 * @author Andrew Jarombek
 * @since 2/16/2020
 */

import React from 'react';
import Home from '../../../src/client/home/Home';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
