/**
 * Snapshot test for the UploadedFile component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import UploadedFile from '../../../src/components/shared/UploadedFile';

describe('UploadedFile Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <UploadedFile
          file={null}
          setFile={null}
          uploadingPicture={{
            uploaded: false,
            uploadedSize: null,
            totalSize: null
          }}
          className="customClass"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
