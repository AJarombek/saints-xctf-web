/**
 * Snapshot test for the StepSlider component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import StepSlider from '../../../src/components/shared/StepSlider';
import { FeelColors } from '../../../src/styles/colors';

describe('StepSlider Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StepSlider
          steps={[
            { value: 1, color: FeelColors[0] },
            { value: 2, color: FeelColors[1] },
            { value: 3, color: FeelColors[2] },
            { value: 4, color: FeelColors[3] },
            { value: 5, color: FeelColors[4] },
            { value: 6, color: FeelColors[5] },
            { value: 7, color: FeelColors[6] },
            { value: 8, color: FeelColors[7] },
            { value: 9, color: FeelColors[8] },
            { value: 10, color: FeelColors[9] }
          ]}
          value={5}
          onValueChange={(): void => null}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
