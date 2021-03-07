/**
 * Snapshot test for the AutoResizeTextArea component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import AutoResizeTextArea from '../../../src/components/shared/AutoResizeTextArea';

describe('AutoResizeTextArea Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AutoResizeTextArea
          maxLength={100}
          placeholder="Snapshot Text Area"
          onChange={(): void => null}
          disabled={false}
          className={null}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
