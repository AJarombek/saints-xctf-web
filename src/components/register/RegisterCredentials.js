/**
 * RegisterCredentials component for the second stage of people creating new accounts.  In this
 * stage, users enter a username and password.  The username is checked to see if it already exists.
 * @author Andrew Jarombek
 * @since 5/12/2020
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ImageInput from '../shared/ImageInput';
import ImageInputSet from '../shared/ImageInputSet';
import usernameLogo from '../../../assets/username.png';
import passwordLogo from '../../../assets/password.png';
import keyLogo from '../../../assets/key.png';
import { AJButton } from 'jarombek-react-components';

const RegisterCredentials = ({ registration, registerCredentials, registerBack }) => {
  const [username, setUsername] = useState(registration.username || "");
  const [password, setPassword] = useState(registration.password || "");
  const [confirmPassword, setConfirmPassword] = useState(registration.password || "");
  const [activationCode, setActivationCode] = useState(registration.activation_code || "");

  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [activationCodeValid, setActivationCodeValid] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState(ImageInput.Status.NONE);
  const [passwordStatus, setPasswordStatus] = useState(ImageInput.Status.NONE);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(ImageInput.Status.NONE);
  const [activationCodeStatus, setActivationCodeStatus] = useState(ImageInput.Status.NONE);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let message;
    switch (registration.status) {
      case "USERNAME ALREADY IN USE":
      case "ACTIVATION CODE INVALID":
      case "INTERNAL ERROR":
      default:
        setErrorStatus(null);
    }
  }, [registration.status]);

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);

    const isValid = usernamePattern.test(value);
    const status = isValid ? ImageInput.Status.NONE : ImageInput.Status.WARNING;

    setUsernameStatus(status);
    setUsernameValid(isValid);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    const lengthValid = value.length >= 8;
    const valueValid = value === confirmPassword;

    const status = lengthValid ? ImageInput.Status.NONE : ImageInput.Status.WARNING;
    const confirmStatus = valueValid ? ImageInput.Status.NONE : ImageInput.Status.WARNING;

    setPasswordStatus(status);
    setPasswordValid(lengthValid);

    setConfirmPasswordStatus(confirmStatus);
    setConfirmPasswordValid(valueValid);
  };

  const onChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    const isValid = value === password;
    const status = isValid ? ImageInput.Status.NONE : ImageInput.Status.WARNING;

    setConfirmPasswordStatus(status);
    setConfirmPasswordValid(isValid);
  };

  const onChangeActivationCode = (e) => {
    const value = e.target.value;
    setActivationCode(value);

    const isValid = value.length < 8;
    const status = isValid ? ImageInput.Status.NONE : ImageInput.Status.WARNING;

    setActivationCodeStatus(status);
    setActivationCodeValid(isValid);
  };

  const onClickRegister = async () => {
    setLoading(true);
    await registerCredentials(
      registration.first,
      registration.last,
      registration.email,
      username,
      password,
      activationCode
    );
  };

  const onClickBack = () => {
    setLoading(true);
    registerBack();
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
        <p className="input-tip">Username can only contain Roman characters and numbers.</p>
        <ImageInputSet direction={ImageInputSet.Direction.ROW}>
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
        <p className="input-tip">Password must be more than 7 characters long.</p>
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
      { errorStatus && <p className="errorStatus">{errorStatus}</p> }
      <div className="form-buttons">
        <AJButton
          type="contained"
          onClick={onClickRegister}
          disabled={loading || !usernameValid || !passwordValid ||
            !confirmPasswordValid || !activationCodeValid}>
          Register
        </AJButton>
        <AJButton
          type="text"
          onClick={onClickBack}>
          Back
        </AJButton>
      </div>
    </div>
  );
};

RegisterCredentials.propTypes = {
  registration: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    valid: PropTypes.bool,
    status: PropTypes.string,
    stage: PropTypes.number,
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string
  }),
  registerCredentials: PropTypes.func.isRequired,
  registerBack: PropTypes.func.isRequired
};

export default RegisterCredentials;
