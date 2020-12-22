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

interface Props {
  username: string;
  profilePictureUrl: string;
}

const useStyles = createUseStyles(styles);

const UploadProfilePicture: React.FunctionComponent<Props> = ({ username, profilePictureUrl }) => {
  const classes = useStyles();

  const [saving, setSaving] = useState(false);

  const onUpload = async (): Promise<void> => {
    setSaving(true);
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
        <UploadFile onUpload={onUpload} />
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
    </>
  );
};

export default UploadProfilePicture;
