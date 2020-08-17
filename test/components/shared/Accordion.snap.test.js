/**
 * Snapshot test for the Accordion component.
 * @author Andrew Jarombek
 * @since 8/17/2020
 */

import React from 'react';
import Accordion from '../../../src/components/shared/Accordion';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Accordion title="Test Accordion" iconNode="x"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
