/**
 * Component where users upload their profile picture.
 * @author Andrew Jarombek
 * @since 1/27/2021
 */

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { RootState, UploadingProfilePicture, UserMeta } from '../../../redux/types';
import UploadPicture from '../../shared/UploadPicture';
import { putUser, uploadProfilePicture } from '../../../redux/modules/profile';
import { useDispatch, useSelector } from 'react-redux';
import { timeout } from '../../../utils/timeout';

interface Props {
  user: UserMeta;
  profilePictureUrl: string;
  setPictureChangesMade: Dispatch<SetStateAction<boolean>>;
}

const UploadProfilePicture: React.FunctionComponent<Props> = ({ user, profilePictureUrl, setPictureChangesMade }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.profile.users);

  const uploadingProfilePicture: UploadingProfilePicture = useMemo(() => {
    if (user.username && users[user.username]) {
      return users[user.username].uploadingProfilePicture;
    } else {
      return null;
    }
  }, [user.username, users]);

  const [file, setFile] = useState<File>(null);
  const [imageName, setImageName] = useState<string>(null);
  const [saving, setSaving] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [errorUpdatingUser, setErrorUpdatingUser] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (!!file) {
      setPictureChangesMade(true);
    } else {
      setPictureChangesMade(false);
    }
  }, [file, setPictureChangesMade]);

  const updateUser = async (image: string): Promise<void> => {
    const newUser = { ...user };
    newUser.profilepic_name = image;

    const updatedUser = await dispatch(putUser(newUser));

    if (!updatedUser) {
      setErrorUpdatingUser(true);
      setSaving(false);
    } else {
      await timeout(250);

      setFile(null);
      setImageName(null);
      setSaving(false);
      setUploadSuccess(true);
    }
  };

  const onRetryUpdateUser = async (): Promise<void> => {
    await updateUser(imageName);
  };

  const onSubmitPicture = async (): Promise<void> => {
    setSaving(true);
    setErrorUploading(false);
    setErrorUpdatingUser(false);

    const result = ((await dispatch(uploadProfilePicture(user.username, file))) as unknown) as string;

    if (result) {
      setImageName(result);
      await updateUser(result);
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
      pictureUrl={profilePictureUrl}
      uploadingPicture={uploadingProfilePicture}
      errorUpdating={errorUpdatingUser}
      errorUpdatingMessage="Failed to update your user details with the new profile picture"
      onCloseErrorUpdatingModal={(): void => setErrorUpdatingUser(false)}
      errorUploading={errorUploading}
      errorUploadingMessage="Failed to upload your new profile picture"
      onCloseErrorUploadingModal={(): void => setErrorUploading(false)}
      onRetryUpload={onSubmitPicture}
      onRetryUpdate={onRetryUpdateUser}
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

export default UploadProfilePicture;
