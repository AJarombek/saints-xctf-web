/**
 * Snapshot test for the {@link ../../src/client/home/HomeTestimonials} component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import HomeTestimonials from '../../src/components/home/HomeTestimonials';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HomeTestimonials />).toJSON();
  expect(tree).toMatchSnapshot();
});
