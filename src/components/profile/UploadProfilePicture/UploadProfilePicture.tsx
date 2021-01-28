/**
 * Component where users upload their profile picture.
 * @author Andrew Jarombek
 * @since 1/27/2021
 */

import React, { useState } from 'react';
import { UserMeta } from '../../../redux/types';
import UploadPicture from '../../shared/UploadPicture';
import { putUser, uploadProfilePicture } from '../../../redux/modules/profile';
import { useDispatch } from 'react-redux';

interface Props {
  user: UserMeta;
  profilePictureUrl: string;
}

const UploadProfilePicture: React.FunctionComponent<Props> = ({ user, profilePictureUrl }) => {
  const dispatch = useDispatch();

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
      await updateUser();
    } else {
      setErrorUploading(true);
    }

    setSaving(false);
  };

  return (
    <UploadPicture
      pictureType="user"
      pictureUrl={profilePictureUrl}
      onUpload={onUpload}
      errorUpdating={errorUpdatingUser}
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingUser(false)}
      onRetry={updateUser}
      setFile={setFile}
      saving={saving}
    />
  );
};

export default UploadProfilePicture;
