/**
 * Snapshot test for the NavBar component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import NavBar from '../../../src/components/shared/NavBar';
import renderer from 'react-test-renderer';

// Mock react router's useHistory() hook before the tests execute.
jest.mock('react-router-dom', () => {
  const historyObj = {
    push: jest.fn()
  };

  return {
    ...jest.requireActual('react-router-dom'),
    useHistory: () => historyObj
  }
});

it('renders correctly', () => {
  const tree = renderer.create(<NavBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
