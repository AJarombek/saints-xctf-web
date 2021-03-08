/**
 * Snapshot test for the CheckBox component.
 * @author Andrew Jarombek
 * @since 3/7/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import CheckBox from '../../../src/components/shared/CheckBox';

describe('CheckBox Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CheckBox checked={true} onChange={(): void => null} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
