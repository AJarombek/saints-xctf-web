/**
 * Snapshot test for the ImageInputSet component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import ImageInputSet, {ImageInputDirection} from '../../../src/components/shared/ImageInputSet';
import ImageInput, {ImageInputStatus} from '../../../src/components/shared/ImageInput';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ImageInputSet direction={ImageInputDirection.ROW} >
      <ImageInput
        type="text"
        name="test1"
        placeholder="Test 1"
        onChange={() => {}}
        status={ImageInputStatus.NONE}
      />
      <ImageInput
        type="text"
        name="test2"
        placeholder="Test 2"
        onChange={() => {}}
        status={ImageInputStatus.SUCCESS}
      />
    </ImageInputSet>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
