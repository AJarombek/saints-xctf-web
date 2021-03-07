/**
 * Snapshot test for the Alert component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Alert from '../../../src/components/shared/Alert';

describe('Alert Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Alert message="An error occurred." type="error" closeable={true} onClose={(): void => null} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
