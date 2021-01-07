/**
 * Component where users upload their profile picture.
 * @author Andrew Jarombek
 * @since 12/21/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import UploadFile from '../../shared/UploadFile/UploadFile';
import { AJButton } from 'jarombek-react-components';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { putUser, uploadProfilePicture } from '../../../redux/modules/profile';
import { UserMeta } from '../../../redux/types';
import AlertPopup from '../../shared/AlertPopup';

interface Props {
  user: UserMeta;
  profilePictureUrl: string;
}

const useStyles = createUseStyles(styles);

const UploadProfilePicture: React.FunctionComponent<Props> = ({ user, profilePictureUrl }) => {
  const classes = useStyles();

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

  const onSubmitPicture = (): void => {};

  const onCancelPicture = (): void => {};

  return (
    <>
      <div className={classes.profilePictureContainer}>
        <figure className={classes.picture}>
          <img src={profilePictureUrl} alt="" />
        </figure>
        <UploadFile onUpload={onUpload} setFile={setFile} />
      </div>
      <div className={classes.actions}>
        <AJButton
          type="contained"
          disabled={false}
          onClick={onSubmitPicture}
          className={classNames(classes.submitButton, saving && classes.disabledSubmitButton)}
        >
          <p>{saving ? 'Saving Picture...' : 'Save Picture'}</p>
          {saving && <LoadingSpinner className={classes.buttonSpinner} />}
        </AJButton>
        <AJButton type="text" disabled={false} onClick={onCancelPicture} className={classes.cancelButton}>
          Cancel
        </AJButton>
      </div>
      {errorUpdatingUser && (
        <AlertPopup
          message={
            <div className={classes.alertMessage}>
              <p>
                Failed to update your user details with the new profile picture. If this error persists, contact{' '}
                <a className={classes.emailLink} href="mailto:andrew@jarombek.com">
                  andrew@jarombek.com
                </a>
                .
              </p>
              <p onClick={updateUser} className={classes.retry}>
                Retry
              </p>
            </div>
          }
          onClose={(): void => setErrorUpdatingUser(false)}
          type="error"
        />
      )}
    </>
  );
};

export default UploadProfilePicture;
