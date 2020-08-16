/**
 * Snapshot test for the NavBar component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import NavBar from '../../../src/components/shared/NavBar';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
