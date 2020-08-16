/**
 * Snapshot test for the ImageInput component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import ImageInput, {ImageInputStatus} from '../../../src/components/shared/ImageInput';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ImageInput
      type="text"
      name="test1"
      placeholder="Test 1"
      onChange={() => {}}
      status={ImageInputStatus.NONE}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
