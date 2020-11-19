/**
 * Component for a tab on the profile page which allows users to edit their profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, {useRef, useState} from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta } from '../../../redux/types';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import classNames from 'classnames';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea';

interface Props {
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const EditProfile: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const descriptionRef = useRef(null);

  const [firstName, setFirstName] = useState('');
  const [firstNameStatus, setFirstNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [lastName, setLastName] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [classYear, setClassYear] = useState('');
  const [location, setLocation] = useState('');
  const [favoriteEvent, setFavoriteEvent] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={classes.editProfile}>
      <h3 className={classes.title}>Profile Details</h3>
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
        <div className={classes.twoInputs}>
          <div
            className={classNames(classes.emailInput, emailStatus === ImageInputStatus.FAILURE && classes.inputError)}
          >
            <p className={classes.inputTitle}>Email*</p>
            <ImageInput
              type="email"
              name="email"
              placeholder=""
              useCustomValue={true}
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
              status={emailStatus}
            />
          </div>
          <div className={classes.classYearInput}>
            <p className={classes.inputTitle}>Class Year</p>
            <ImageInput
              type="number"
              name="classYear"
              placeholder=""
              useCustomValue={true}
              value={classYear}
              onChange={(e): void => setClassYear(e.target.value)}
              status={ImageInputStatus.NONE}
            />
          </div>
        </div>
        <div className={classes.twoInputs}>
          <div className={classes.locationInput}>
            <p className={classes.inputTitle}>Email*</p>
            <ImageInput
              type="text"
              name="location"
              placeholder=""
              useCustomValue={true}
              value={location}
              onChange={(e): void => setLocation(e.target.value)}
              status={ImageInputStatus.NONE}
            />
          </div>
          <div className={classes.favoriteEventInput}>
            <p className={classes.inputTitle}>Favorite Event</p>
            <ImageInput
              type="number"
              name="favoriteEvent"
              placeholder=""
              useCustomValue={true}
              value={favoriteEvent}
              onChange={(e): void => setFavoriteEvent(e.target.value)}
              status={ImageInputStatus.NONE}
            />
          </div>
        </div>
        <div>
          <p className={classes.inputTitle}>Description</p>
          <AutoResizeTextArea
            maxLength={1000}
            placeholder="..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setDescription(e.target.value)}
            useCustomValue={true}
            value={description}
            disabled={false}
            className={classes.textArea}
            ref={descriptionRef}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
