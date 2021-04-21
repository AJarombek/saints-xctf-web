/**
 * Component for a tab on the profile page which allows users to edit their profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Memberships, RootState, User, UserMeta, Users } from '../../../redux/types';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import classNames from 'classnames';
import AutoResizeTextArea from '../../shared/AutoResizeTextArea';
import RadioButton from '../../shared/RadioButton';
import { AJButton } from 'jarombek-react-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMemberships, putUser } from '../../../redux/modules/profile';
import PickTeams from '../PickTeams';
import UploadProfilePicture from '../UploadProfilePicture';
import DefaultErrorPopup from '../../shared/DefaultErrorPopup';
import LoadingSpinner from '../../shared/LoadingSpinner';
import AlertPopup from '../../shared/AlertPopup';

interface Props {
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const emailPattern = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;

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
  const [formDirty, setFormDirty] = useState(false);

  const [updatingProfileDetails, setUpdatingProfileDetails] = useState(false);
  const [errorUpdatingProfileDetails, setErrorUpdatingProfileDetails] = useState(false);
  const [profileDetailsUpdateSuccess, setProfileDetailsUpdateSuccess] = useState(false);

  useEffect(() => {
    if (userProfiles && user?.username && !userProfiles[user.username]?.memberships) {
      dispatch(getUserMemberships(user.username));
    }
  }, [dispatch, user.username, userProfiles]);

  useEffect(() => {
    if (userProfiles[user.username]) {
      const userProfile = userProfiles[user.username];

      setMemberships(userProfile.memberships);

      if (userProfile.user) {
        setFirstName(userProfile.user.first);
        setLastName(userProfile.user.last);
        setEmail(userProfile.user.email);
        setClassYear(userProfile.user.class_year);
        setLocation(userProfile.user.location);
        setFavoriteEvent(userProfile.user.favorite_event);
        setDescription(userProfile.user.description);
        setWeekStart(userProfile.user.week_start);
      }
    }
  }, [userProfiles, user.username]);

  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const first = e.target.value;
    setFirstName(first);
    if (!formDirty) setFormDirty(true);

    if (first.length) {
      setFirstNameStatus(ImageInputStatus.NONE);
    } else {
      setFirstNameStatus(ImageInputStatus.WARNING);
    }
  };

  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const last = e.target.value;
    setLastName(last);
    if (!formDirty) setFormDirty(true);

    if (last.length) {
      setLastNameStatus(ImageInputStatus.NONE);
    } else {
      setLastNameStatus(ImageInputStatus.WARNING);
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!formDirty) setFormDirty(true);

    if (newEmail.length && emailPattern.test(newEmail)) {
      setEmailStatus(ImageInputStatus.NONE);
    } else {
      setEmailStatus(ImageInputStatus.WARNING);
    }
  };

  const onClassYearChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setClassYear(+e.target.value);
    if (!formDirty) setFormDirty(true);
  };

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocation(e.target.value);
    if (!formDirty) setFormDirty(true);
  };

  const onFavoriteEventChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFavoriteEvent(e.target.value);
    if (!formDirty) setFormDirty(true);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
    if (!formDirty) setFormDirty(true);
  };

  const onWeekStartChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setWeekStart(e.target.value);
      if (!formDirty) setFormDirty(true);
    }
  };

  const resetDetails = (userDetails: User): void => {
    setFirstName(userDetails.first);
    setLastName(userDetails.last);
    setEmail(userDetails.email);
    setClassYear(userDetails.class_year);
    setLocation(userDetails.location);
    setFavoriteEvent(userDetails.favorite_event);
    setDescription(userDetails.description);
    setWeekStart(userDetails.week_start);
    setFormDirty(false);
  };

  const onSubmitDetails = async (): Promise<void> => {
    setUpdatingProfileDetails(true);

    const newUser: User = {
      username: user.username,
      first: firstName,
      last: lastName,
      profilepic_name: user.profilepic_name,
      description,
      class_year: classYear,
      location,
      favorite_event: favoriteEvent,
      email,
      week_start: weekStart
    };

    const updatedUser = (await dispatch(putUser(newUser))) as User;

    if (updatedUser) {
      resetDetails(updatedUser);
      setProfileDetailsUpdateSuccess(true);
    } else {
      setErrorUpdatingProfileDetails(true);
    }

    setUpdatingProfileDetails(false);
  };

  const onCancelDetails = (): void => {
    resetDetails(user);
  };

  return (
    <div className={classes.editProfile} id="editProfile">
      <h3 className={classes.title}>Profile Details</h3>
      <div className={classes.form}>
        <div className={classes.twoInputs}>
          <div
            className={classNames(
              classes.firstNameInput,
              firstNameStatus === ImageInputStatus.FAILURE && classes.inputError,
              firstNameStatus === ImageInputStatus.WARNING && classes.inputWarning
            )}
          >
            <p className={classes.inputTitle}>First Name*</p>
            <ImageInput
              type="text"
              name="first"
              placeholder=""
              useCustomValue={true}
              value={firstName}
              maxLength={30}
              onChange={onFirstNameChange}
              status={firstNameStatus}
            />
            <p
              className={classes.inputTip}
              hidden={firstNameStatus === ImageInputStatus.NONE}
              data-cypress="firstNameInputTip"
            >
              First name is a required field.
            </p>
          </div>
          <div
            className={classNames(
              classes.lastNameInput,
              lastNameStatus === ImageInputStatus.FAILURE && classes.inputError,
              lastNameStatus === ImageInputStatus.WARNING && classes.inputWarning
            )}
          >
            <p className={classes.inputTitle}>Last Name*</p>
            <ImageInput
              type="text"
              name="last"
              placeholder=""
              useCustomValue={true}
              value={lastName}
              maxLength={30}
              onChange={onLastNameChange}
              status={lastNameStatus}
            />
            <p
              className={classes.inputTip}
              hidden={lastNameStatus === ImageInputStatus.NONE}
              data-cypress="lastNameInputTip"
            >
              Last name is a required field.
            </p>
          </div>
        </div>
        <div className={classes.twoInputs}>
          <div
            className={classNames(
              classes.emailInput,
              emailStatus === ImageInputStatus.FAILURE && classes.inputError,
              emailStatus === ImageInputStatus.WARNING && classes.inputWarning
            )}
          >
            <p className={classes.inputTitle}>Email*</p>
            <ImageInput
              type="email"
              name="email"
              placeholder=""
              useCustomValue={true}
              value={email}
              maxLength={50}
              onChange={onEmailChange}
              status={emailStatus}
            />
            <p className={classes.inputTip} hidden={emailStatus === ImageInputStatus.NONE} data-cypress="emailInputTip">
              A valid email address is required.
            </p>
          </div>
          <div className={classes.classYearInput}>
            <p className={classes.inputTitle}>Class Year</p>
            <ImageInput
              type="number"
              name="classYear"
              placeholder=""
              useCustomValue={true}
              value={`${classYear}`}
              maxLength={4}
              onChange={onClassYearChange}
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
              maxLength={50}
              onChange={onLocationChange}
              status={ImageInputStatus.NONE}
            />
          </div>
          <div className={classes.favoriteEventInput}>
            <p className={classes.inputTitle}>Favorite Event</p>
            <ImageInput
              type="text"
              name="favoriteEvent"
              placeholder=""
              useCustomValue={true}
              value={favoriteEvent}
              maxLength={20}
              onChange={onFavoriteEventChange}
              status={ImageInputStatus.NONE}
            />
          </div>
        </div>
        <div>
          <p className={classes.inputTitle}>Description</p>
          <AutoResizeTextArea
            maxLength={255}
            placeholder="..."
            onChange={onDescriptionChange}
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
          <AJButton
            type="contained"
            disabled={
              updatingProfileDetails || !formDirty || !firstName || !lastName || emailStatus !== ImageInputStatus.NONE
            }
            onClick={onSubmitDetails}
            className={classNames(
              classes.submitButton,
              (updatingProfileDetails || !formDirty || !firstName || !lastName || !email) &&
                classes.disabledSubmitButton
            )}
          >
            <p>{updatingProfileDetails ? 'Saving Details...' : 'Save Details'}</p>
            {updatingProfileDetails && <LoadingSpinner className={classes.buttonSpinner} />}
          </AJButton>
          <AJButton type="text" disabled={false} onClick={onCancelDetails} className={classes.cancelButton}>
            Cancel
          </AJButton>
        </div>
      </div>
      <h3 className={classes.title}>Profile Picture</h3>
      <div className={classes.form}>
        <UploadProfilePicture
          user={user}
          profilePictureUrl={
            user.profilepic_name ? `/uasset/profile/${user.username}/${user.profilepic_name}` : '/asset/saintsxctf.png'
          }
        />
      </div>
      <h3 className={classes.title}>Teams and Groups</h3>
      <div className={classes.form}>
        <PickTeams teams={memberships?.teams} username={user.username} />
      </div>
      {errorUpdatingProfileDetails && (
        <DefaultErrorPopup
          message="Failed to update the user's profile details"
          onClose={(): void => setErrorUpdatingProfileDetails(false)}
          retryable={true}
          onRetry={onSubmitDetails}
        />
      )}
      {profileDetailsUpdateSuccess && (
        <AlertPopup
          message="Profile Details Updated!"
          onClose={(): void => setProfileDetailsUpdateSuccess(false)}
          type="success"
          autoCloseInterval={3000}
        />
      )}
    </div>
  );
};

export default EditProfile;
