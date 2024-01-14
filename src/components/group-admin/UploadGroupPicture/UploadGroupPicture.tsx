/**
 * Component where admins upload a group picture.
 * @author Andrew Jarombek
 * @since 1/28/2021
 */

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import UploadPicture from '../../shared/UploadPicture';
import { useDispatch, useSelector } from 'react-redux';
import { GroupMeta, RootState, UploadingGroupPicture } from '../../../redux/types';
import { putGroup, uploadGroupPicture } from '../../../redux/modules/groups';
import { timeout } from '../../../utils/timeout';

interface Props {
  group: GroupMeta;
  groupPictureUrl: string;
  setPictureChangesMade: Dispatch<SetStateAction<boolean>>;
}

const UploadGroupPicture: React.FunctionComponent<Props> = ({ group, groupPictureUrl, setPictureChangesMade }) => {
  const dispatch = useDispatch();
  const uploadingGroupPictures: Record<string, UploadingGroupPicture> = useSelector(
    (state: RootState) => state.groups.uploadingGroupPicture,
  );

  const uploadingGroupPicture: UploadingGroupPicture = useMemo(() => {
    if (group.id) {
      return uploadingGroupPictures[group.id];
    } else {
      return null;
    }
  }, [group.id, uploadingGroupPictures]);

  const [file, setFile] = useState<File>(null);
  const [imageName, setImageName] = useState<string>(null);
  const [saving, setSaving] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [errorUpdatingGroup, setErrorUpdatingGroup] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (!!file) {
      setPictureChangesMade(true);
    } else {
      setPictureChangesMade(false);
    }
  }, [file, setPictureChangesMade]);

  const updateGroup = async (image: string): Promise<void> => {
    const newGroup = { ...group };
    newGroup.grouppic_name = image;

    const updatedGroup = await dispatch(putGroup(newGroup));

    if (!updatedGroup) {
      setErrorUpdatingGroup(true);
      setSaving(false);
    } else {
      await timeout(250);

      setFile(null);
      setImageName(null);
      setSaving(false);
      setUploadSuccess(true);
    }
  };

  const onRetryUpdateGroup = async (): Promise<void> => {
    await updateGroup(imageName);
  };

  const onSubmitPicture = async (): Promise<void> => {
    setSaving(true);
    setUploadSuccess(false);
    setErrorUploading(false);
    setErrorUpdatingGroup(false);

    const result = ((await dispatch(uploadGroupPicture(group.id, file))) as unknown) as string;

    if (result) {
      setImageName(result);
      await updateGroup(result);
    } else {
      setErrorUploading(true);
      setSaving(false);
    }
  };

  const onCancelPicture = (): void => {
    setFile(null);
    setImageName(null);
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
      onRetryUpdate={onRetryUpdateGroup}
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
