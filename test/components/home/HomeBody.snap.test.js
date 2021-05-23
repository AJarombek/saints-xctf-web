/**
 * Snapshot test for the HomeBody component.
 * @author Andrew Jarombek
 * @since 2/20/2020
 */

import React from 'react';
import HomeBody from '../../../src/components/home/HomeBody';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <HomeBody />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
