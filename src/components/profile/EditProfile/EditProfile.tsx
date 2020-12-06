/**
 * Component for a tab on the profile page which allows users to edit their profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Memberships, RootState, UserMeta, Users } from '../../../redux/types';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import classNames from 'classnames';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea';
import RadioButton from '../../shared/RadioButton';
import UploadFile from '../../shared/UploadFile/UploadFile';
import { AJButton } from 'jarombek-react-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMemberships } from '../../../redux/modules/profile';
import PickTeams from '../PickTeams';

interface Props {
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const EditProfile: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);

  const descriptionRef = useRef(null);

  const [memberships, setMemberships] = useState<Memberships>(null);
  const [firstName, setFirstName] = useState('');
  const [firstNameStatus, setFirstNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [lastName, setLastName] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [classYear, setClassYear] = useState(0);
  const [location, setLocation] = useState('');
  const [favoriteEvent, setFavoriteEvent] = useState('');
  const [description, setDescription] = useState('');
  const [weekStart, setWeekStart] = useState('');

  useEffect(() => {
    dispatch(getUserMemberships(user.username));
  }, [dispatch, user.username]);

  useEffect(() => {
    setMemberships(userProfiles[user.username].memberships);
  }, [userProfiles, user.username]);

  const onWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setWeekStart(e.target.value);
    }
  };

  const onSubmitDetails = (): void => {};

  const onCancelDetails = (): void => {
    setFirstName(user.first);
    setLastName(user.last);
    setEmail(user.email);
    setClassYear(user.class_year);
    setLocation(user.location);
    setFavoriteEvent(user.favorite_event);
    setDescription(user.description);
    setWeekStart(user.week_start);
  };

  const onSubmitPicture = (): void => {};
  const onCancelPicture = (): void => {};

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
              value={`${classYear}`}
              onChange={(e): void => setClassYear(+e.target.value)}
              status={ImageInputStatus.NONE}
            />
          </div>
        </div>
        <div className={classes.twoInputs}>
          <div className={classes.locationInput}>
            <p className={classes.inputTitle}>Location</p>
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
        <div>
          <p className={classes.inputTitle}>Week Start</p>
          <div className={classes.radioGroup}>
            <RadioButton
              id="sunday"
              name="weekStart"
              value="sunday"
              label="Sunday"
              onChange={onWeekStartChange}
              defaultChecked={user.week_start === 'sunday'}
              className={classes.radio}
            />
            <RadioButton
              id="monday"
              name="weekStart"
              value="monday"
              label="Monday"
              onChange={onWeekStartChange}
              defaultChecked={user.week_start === 'monday'}
              className={classes.radio}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <AJButton type="contained" disabled={false} onClick={onSubmitDetails} className={classes.submitButton}>
            Save Details
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancelDetails} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
      <h3 className={classes.title}>Profile Picture</h3>
      <div className={classes.form}>
        <div className={classes.profilePictureContainer}>
          <figure className={classes.picture}>
            <img src="" alt="" />
          </figure>
          <UploadFile />
        </div>
        <div className={classes.actions}>
          <AJButton type="contained" disabled={false} onClick={onSubmitPicture} className={classes.submitButton}>
            Save Picture
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancelPicture} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
      <h3 className={classes.title}>Teams and Groups</h3>
      <div className={classes.form}>
        <PickTeams teams={memberships?.teams} />
        <div className={classes.actions}>
          <AJButton type="contained" disabled={false} onClick={onSubmitPicture} className={classes.submitButton}>
            Save Teams & Groups
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancelPicture} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
