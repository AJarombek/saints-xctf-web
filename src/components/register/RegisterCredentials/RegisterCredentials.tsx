/**
 * RegisterCredentials component for the second stage of people creating new accounts.  In this
 * stage, users enter a username and password.  The username is checked to see if it already exists.
 * @author Andrew Jarombek
 * @since 5/12/2020
 */

import React, { useEffect, useState } from 'react';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import ImageInputSet, { ImageInputDirection } from '../../shared/ImageInputSet';
import { AJButton } from 'jarombek-react-components';
import { useDispatch } from 'react-redux';
import { registerBack, registerCredentials } from '../../../redux/modules/registration';
import { RegistrationState } from '../../../redux/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import usernameLogo from '../../../../assets/username.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import passwordLogo from '../../../../assets/password.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import keyLogo from '../../../../assets/key.png';

interface Props {
  registration: RegistrationState;
}

const RegisterCredentials: React.FunctionComponent<Props> = ({ registration }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(registration.username || '');
  const [password, setPassword] = useState(registration.password || '');
  const [confirmPassword, setConfirmPassword] = useState(registration.password || '');
  const [activationCode, setActivationCode] = useState(registration.activation_code || '');

  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [activationCodeValid, setActivationCodeValid] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [passwordStatus, setPasswordStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [activationCodeStatus, setActivationCodeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let message;
    if (registration.status)
      switch (registration.status) {
        case 'USERNAME ALREADY IN USE':
          message = 'A user already exists with this username.';
          setErrorStatus(message);

          setUsernameStatus(ImageInputStatus.FAILURE);
          setActivationCodeStatus(ImageInputStatus.NONE);
          setPasswordStatus(ImageInputStatus.NONE);
          break;
        case 'VALIDATION ERROR':
          setErrorStatus(registration.serverError);

          const activationCodeError = registration.serverError === 'The activation code is invalid or expired.';
          const activationCodeStatus = activationCodeError ? ImageInputStatus.FAILURE : ImageInputStatus.NONE;

          const passwordError = registration.serverError === 'Password must contain at least 8 characters.';
          const passwordStatus = passwordError ? ImageInputStatus.FAILURE : ImageInputStatus.NONE;

          setUsernameStatus(ImageInputStatus.NONE);
          setActivationCodeStatus(activationCodeStatus);
          setPasswordStatus(passwordStatus);
          break;
        case 'INTERNAL ERROR':
          message = 'An unexpected error occurred.  Contact andrew@jarombek.com if this error persists.';
          setErrorStatus(message);

          setUsernameStatus(ImageInputStatus.NONE);
          setActivationCodeStatus(ImageInputStatus.NONE);
          setPasswordStatus(ImageInputStatus.NONE);
          break;
        default:
          setErrorStatus(null);

          setUsernameStatus(ImageInputStatus.NONE);
          setActivationCodeStatus(ImageInputStatus.NONE);
          setPasswordStatus(ImageInputStatus.NONE);
      }
  }, [registration.status, registration.serverError]);

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  /**
   * Perform validation and hook updates when the username input is updated.
   * @param e DOM event object.
   */
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUsername(value);

    const isValid = usernamePattern.test(value);
    const status = isValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setUsernameStatus(status);
    setUsernameValid(isValid);

    if (errorStatus === 'A user already exists with this username.') {
      setErrorStatus(null);
    }
  };

  /**
   * Perform validation and hook updates when the password input is updated.  Validates both
   * the password and confirm password inputs.
   * @param e DOM event object.
   */
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);

    const lengthValid = value.length >= 8;
    const valueValid = value === confirmPassword;

    const status = lengthValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;
    const confirmStatus = valueValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setPasswordStatus(status);
    setPasswordValid(lengthValid);

    setConfirmPasswordStatus(confirmStatus);
    setConfirmPasswordValid(valueValid);

    if (errorStatus === 'Password must contain at least 8 characters.') {
      setErrorStatus(null);
    }
  };

  /**
   * Perform validation and hook updates when the 'confirm password' input is updated.
   * @param e DOM event object.
   */
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setConfirmPassword(value);

    const isValid = value === password;
    const status = isValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setConfirmPasswordStatus(status);
    setConfirmPasswordValid(isValid);
  };

  /**
   * Perform validation and hook updates when the 'activation code' input is updated.
   * @param e DOM event object.
   */
  const onChangeActivationCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setActivationCode(value);

    const isValid = value.length >= 6;
    const status = isValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setActivationCodeStatus(status);
    setActivationCodeValid(isValid);

    if (errorStatus === 'The activation code is invalid or expired.') {
      setErrorStatus(null);
    }
  };

  /**
   * When the register button is clicked, attempt to register the new user with the
   * credentials given.
   */
  const onClickRegister = async (): Promise<void> => {
    setLoading(true);
    await dispatch(
      registerCredentials(
        registration.first,
        registration.last,
        registration.email,
        username,
        password,
        activationCode,
      ),
    );
    setLoading(false);
  };

  /**
   * When users click the 'Back' button, move the registration process back to the first stage.
   */
  const onClickBack = async (): Promise<void> => {
    setLoading(true);
    await dispatch(registerBack());
    setLoading(false);
  };

  return (
    <div className="sxctf-register-credentials">
      <h2>Register</h2>
      <div className="form-inputs">
        <ImageInput
          onChange={onChangeUsername}
          icon={usernameLogo}
          placeholder="Username"
          name="username"
          type="text"
          autoComplete="username"
          maxLength={20}
          status={usernameStatus}
        />
        <p className="input-tip">Username can only contain numbers and Roman characters.</p>
        <ImageInputSet direction={ImageInputDirection.ROW}>
          <ImageInput
            onChange={onChangePassword}
            icon={passwordLogo}
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            maxLength={80}
            status={passwordStatus}
          />
          <ImageInput
            onChange={onChangeConfirmPassword}
            icon={passwordLogo}
            placeholder="Confirm Password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            maxLength={80}
            status={confirmPasswordStatus}
          />
        </ImageInputSet>
        <p className="input-tip">Password must be 8 or more characters long.</p>
        <ImageInput
          onChange={onChangeActivationCode}
          icon={keyLogo}
          placeholder="Activation Code"
          name="activation-code"
          type="text"
          autoComplete=""
          maxLength={8}
          status={activationCodeStatus}
        />
      </div>
      {errorStatus && <p className="errorStatus">{errorStatus}</p>}
      <div className="form-buttons">
        <AJButton
          type="contained"
          onClick={onClickRegister}
          disabled={loading || !usernameValid || !passwordValid || !confirmPasswordValid || !activationCodeValid}
        >
          Register
        </AJButton>
        <AJButton type="text" onClick={onClickBack}>
          Back
        </AJButton>
      </div>
    </div>
  );
};

export default RegisterCredentials;
