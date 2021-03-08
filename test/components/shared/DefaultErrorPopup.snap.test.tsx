/**
 * Snapshot test for the DefaultErrorPopup component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import DefaultErrorPopup from '../../../src/components/shared/DefaultErrorPopup';

describe('DefaultErrorPopup Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DefaultErrorPopup
          message="Snapshot error"
          retryable={true}
          closeable={true}
          onClose={(): void => null}
          onRetry={(): void => null}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
