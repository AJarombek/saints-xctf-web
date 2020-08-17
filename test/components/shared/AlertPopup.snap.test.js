/**
 * Snapshot test for the AlertPopup component.
 * @author Andrew Jarombek
 * @since 8/17/2020
 */

import React from 'react';
import AlertPopup from '../../../src/components/shared/AlertPopup';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <AlertPopup type="error" message="An error occurred." onClose={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
