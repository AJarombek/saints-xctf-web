/**
 * Component where admins upload a group picture.
 * @author Andrew Jarombek
 * @since 1/28/2021
 */

import React, { useState } from 'react';
import UploadPicture from '../../shared/UploadPicture';
import { useDispatch } from 'react-redux';
import { GroupMeta } from '../../../redux/types';
import { putGroup, uploadGroupPicture } from '../../../redux/modules/groups';

interface Props {
  group: GroupMeta;
  groupPictureUrl: string;
}

const UploadGroupPicture: React.FunctionComponent<Props> = ({ group, groupPictureUrl }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File>(null);
  const [saving, setSaving] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [errorUpdatingGroup, setErrorUpdatingGroup] = useState(false);

  const updateGroup = async (): Promise<void> => {
    const updatedGroup = await dispatch(putGroup(group));

    if (!updatedGroup) {
      setErrorUpdatingGroup(true);
    }
  };

  const onUpload = async (): Promise<void> => {
    setSaving(true);
    setErrorUploading(false);
    setErrorUpdatingGroup(false);

    const result = await dispatch(uploadGroupPicture(group.id, file));

    if (result) {
      await updateGroup();
    } else {
      setErrorUploading(true);
    }

    setSaving(false);
  };

  return (
    <UploadPicture
      pictureUrl={groupPictureUrl}
      onUpload={onUpload}
      errorUpdating={errorUpdatingGroup}
      errorUpdatingMessage="Failed to update group details with the new group picture"
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingGroup(false)}
      onRetryUpdate={onUpload}
      errorUploading={errorUploading}
      errorUploadingMessage="Failed to upload a new picture for the group"
      onCloseErrorUploadingModal={(): void => setErrorUploading(false)}
      onRetryUpload={updateGroup}
      setFile={setFile}
      saving={saving}
    />
  );
};

export default UploadGroupPicture;
