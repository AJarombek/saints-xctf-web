/**
 * Component where admins upload a group picture.
 * @author Andrew Jarombek
 * @since 1/28/2021
 */

import React, { useMemo, useState } from 'react';
import UploadPicture from '../../shared/UploadPicture';
import { useDispatch, useSelector } from 'react-redux';
import { GroupMeta, RootState, UploadingGroupPicture } from '../../../redux/types';
import { putGroup, uploadGroupPicture } from '../../../redux/modules/groups';

interface Props {
  group: GroupMeta;
  groupPictureUrl: string;
}

const UploadGroupPicture: React.FunctionComponent<Props> = ({ group, groupPictureUrl }) => {
  const dispatch = useDispatch();
  const uploadingGroupPictures: Record<string, UploadingGroupPicture> = useSelector(
    (state: RootState) => state.groups.uploadingGroupPicture
  );

  const uploadingGroupPicture: UploadingGroupPicture = useMemo(() => {
    if (group.id) {
      return uploadingGroupPictures[group.id];
    } else {
      return null;
    }
  }, [group.id, uploadingGroupPictures]);

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
      uploadingPicture={uploadingGroupPicture}
      onUpload={onUpload}
      errorUpdating={errorUpdatingGroup}
      errorUpdatingMessage="Failed to update group details with the new group picture"
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingGroup(false)}
      onRetryUpdate={onUpload}
      errorUploading={errorUploading}
      errorUploadingMessage="Failed to upload a new picture for the group"
      onCloseErrorUploadingModal={(): void => setErrorUploading(false)}
      onRetryUpload={updateGroup}
      file={file}
      setFile={setFile}
      saving={saving}
    />
  );
};

export default UploadGroupPicture;
