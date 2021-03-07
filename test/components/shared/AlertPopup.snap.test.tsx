/**
 * Snapshot test for the AlertPopup component.
 * @author Andrew Jarombek
 * @since 8/17/2020
 */

import React from 'react';
import AlertPopup from '../../../src/components/shared/AlertPopup';
import renderer from 'react-test-renderer';

describe('AlertPopup Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<AlertPopup type="error" message="An error occurred." onClose={(): void => null} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
