/**
 * Component where users upload their profile picture.
 * @author Andrew Jarombek
 * @since 1/27/2021
 */

import React, { useMemo, useState } from 'react';
import {RootState, UploadingProfilePicture, UserMeta} from '../../../redux/types';
import UploadPicture from '../../shared/UploadPicture';
import { putUser, uploadProfilePicture } from '../../../redux/modules/profile';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  user: UserMeta;
  profilePictureUrl: string;
}

const UploadProfilePicture: React.FunctionComponent<Props> = ({ user, profilePictureUrl }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.profile.users);

  const uploadingProfilePicture: UploadingProfilePicture = useMemo(() => {
    if (user.username) {
      return users[user.username].uploadingProfilePicture;
    } else {
      return null;
    }
  }, [user.username, users]);

  const [file, setFile] = useState<File>(null);
  const [saving, setSaving] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [errorUpdatingUser, setErrorUpdatingUser] = useState(false);

  const updateUser = async (): Promise<void> => {
    const updatedUser = await dispatch(putUser(user));

    if (!updatedUser) {
      setErrorUpdatingUser(true);
    }
  };

  const onUpload = async (): Promise<void> => {
    setSaving(true);
    setErrorUploading(false);
    setErrorUpdatingUser(false);

    const result = await dispatch(uploadProfilePicture(user.username, file));

    if (result) {
      await dispatch(updateUser());
    } else {
      setErrorUploading(true);
    }

    setSaving(false);
  };

  return (
    <UploadPicture
      pictureUrl={profilePictureUrl}
      uploadingPicture={uploadingProfilePicture}
      onUpload={onUpload}
      errorUpdating={errorUpdatingUser}
      errorUpdatingMessage="Failed to update your user details with the new profile picture"
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingUser(false)}
      onRetryUpdate={onUpload}
      errorUploading={errorUploading}
      errorUploadingMessage="Failed to upload your new profile picture"
      onCloseErrorUploadingModal={(): void => setErrorUploading(false)}
      onRetryUpload={updateUser}
      file={file}
      setFile={setFile}
      saving={saving}
    />
  );
};

export default UploadProfilePicture;
