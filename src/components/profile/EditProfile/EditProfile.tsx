/**
 * Component for a tab on the profile page which allows users to edit their profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta } from '../../../redux/types';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import classNames from 'classnames';

interface Props {
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const EditProfile: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [firstNameStatus, setFirstNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [lastName, setLastName] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);

  return (
    <div className={classes.editProfile}>
      <div className={classes.form}>
        <div className={classes.twoInputs}>
          <div
            className={classNames(
              classes.firstNameInput,
              firstNameStatus === ImageInputStatus.FAILURE && classes.inputError
            )}
          >
            <p className={classes.inputTitle}>First Name*</p>
            <ImageInput
              type="text"
              name="first"
              placeholder=""
              useCustomValue={true}
              value={firstName}
              onChange={(e): void => setFirstName(e.target.value)}
              status={firstNameStatus}
            />
          </div>
          <div
            className={classNames(
              classes.lastNameInput,
              lastNameStatus === ImageInputStatus.FAILURE && classes.inputError
            )}
          >
            <p className={classes.inputTitle}>Last Name*</p>
            <ImageInput
              type="text"
              name="last"
              placeholder=""
              useCustomValue={true}
              value={lastName}
              onChange={(e): void => setLastName(e.target.value)}
              status={lastNameStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
