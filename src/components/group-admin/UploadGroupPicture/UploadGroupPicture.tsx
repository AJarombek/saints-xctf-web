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
import { timeout } from '../../../utils/timeout';

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
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const updateGroup = async (): Promise<void> => {
    const newGroup = { ...group };
    newGroup.grouppic_name = file.name;

    const updatedGroup = await dispatch(putGroup(newGroup));

    if (!updatedGroup) {
      setErrorUpdatingGroup(true);
      setSaving(false);
    } else {
      await timeout(250);

      setFile(null);
      setSaving(false);
      setUploadSuccess(true);
    }
  };

  const onSubmitPicture = async (): Promise<void> => {
    setSaving(true);
    setUploadSuccess(false);
    setErrorUploading(false);
    setErrorUpdatingGroup(false);

    const result = await dispatch(uploadGroupPicture(group.id, file));

    if (result) {
      await updateGroup();
    } else {
      setErrorUploading(true);
      setSaving(false);
    }
  };

  const onCancelPicture = (): void => {
    setFile(null);
  };

  return (
    <UploadPicture
      pictureUrl={groupPictureUrl}
      uploadingPicture={uploadingGroupPicture}
      errorUpdating={errorUpdatingGroup}
      errorUpdatingMessage="Failed to update group details with the new group picture"
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingGroup(false)}
      errorUploading={errorUploading}
      errorUploadingMessage="Failed to upload a new picture for the group"
      onCloseErrorUploadingModal={(): void => setErrorUploading(false)}
      onRetryUpload={onSubmitPicture}
      onRetryUpdate={updateGroup}
      file={file}
      setFile={setFile}
      saving={saving}
      uploadSuccess={uploadSuccess}
      setUploadSuccess={setUploadSuccess}
      onSubmitPicture={onSubmitPicture}
      onCancelPicture={onCancelPicture}
    />
  );
};

export default UploadGroupPicture;
