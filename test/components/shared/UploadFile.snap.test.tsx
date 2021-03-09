/**
 * Snapshot test for the UploadFile component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import UploadFile from '../../../src/components/shared/UploadFile';

describe('UploadFile Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UploadFile setFile={(): void => null} className="customClass" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
