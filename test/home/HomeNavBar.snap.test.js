/**
 * Snapshot test for the {@link ../../src/client/home/HomeNavBar} component.
 * @author Andrew Jarombek
 * @since 2/23/2020
 */

import React from 'react';
import HomeNavBar from '../../src/components/home/HomeNavBar';
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
  const tree = renderer.create(<HomeNavBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
