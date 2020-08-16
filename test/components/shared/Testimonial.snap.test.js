/**
 * Snapshot test for the Testimonial component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import Testimonial from '../../../src/components/shared/Testimonial';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Testimonial
      src="https://asset.saintsxctf.com/andy-j.jpg"
      name="Andy Jarombek"
      testimony="Test"
      title="Software Engineer"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
