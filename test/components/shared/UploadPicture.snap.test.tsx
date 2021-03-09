/**
 * Snapshot test for the UploadPicture component.
 * @author Andrew Jarombek
 * @since 3/8/2021
 */

import React from 'react';
import renderer from 'react-test-renderer';
import UploadPicture from '../../../src/components/shared/UploadPicture';

describe('UploadPicture Snapshot Tests', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <UploadPicture
          pictureUrl="picture.png"
          uploadingPicture={{
            uploaded: false,
            uploadedSize: 1000,
            totalSize: 2000
          }}
          onCloseErrorUpdatingModal={(): void => null}
          onRetryUpdate={(): void => null}
          onCloseErrorUploadingModal={(): void => null}
          onRetryUpload={(): void => null}
          file={null}
          setFile={null}
          saving={true}
          uploadSuccess={false}
          setUploadSuccess={null}
          onSubmitPicture={(): void => null}
          onCancelPicture={(): void => null}
          errorUploading={false}
          errorUpdating={false}
          errorUpdatingMessage="An error occurred while updating the snapshot picture"
          errorUploadingMessage="An error occurred while uploading the snapshot picture"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
