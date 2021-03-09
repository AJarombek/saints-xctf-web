/**
 * Snapshot test for the RadioButton component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import RadioButton from '../../../src/components/shared/RadioButton/RadioButton';

describe('RadioButton Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <>
          <RadioButton
            id="sunday"
            name="weekStart"
            value="sunday"
            label="Sunday"
            onChange={(): void => null}
            defaultChecked={true}
            className="customClass1"
          />
          <RadioButton
            id="monday"
            name="weekStart"
            value="monday"
            label="Monday"
            onChange={(): void => null}
            defaultChecked={false}
            className="customClass2"
          />
        </>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
