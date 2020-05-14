/**
 * RegisterCredentials component for the second stage of people creating new accounts.  In this
 * stage, users enter a username and password.  The username is checked to see if it already exists.
 * @author Andrew Jarombek
 * @since 5/12/2020
 */

import React, { useState } from 'react';
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

  const usernamePattern = /^[a-zA-Z0-9]+$/;

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (usernamePattern.test(username)) {
      setUsernameStatus(ImageInput.Status.NONE);
    } else {
      setUsernameStatus(ImageInput.Status.WARNING);
    }
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (password.length < 8) {
      setPasswordStatus(ImageInput.Status.WARNING);
    } else {
      setPasswordStatus(ImageInput.Status.NONE);
    }
  };

  const onChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (confirmPassword === password) {
      setConfirmPasswordStatus(ImageInput.Status.NONE);
    } else {
      setConfirmPasswordStatus(ImageInput.Status.WARNING);
    }
  };

  const onChangeActivationCode = (e) => {
    const value = e.target.value;
    setActivationCode(value);

    if (activationCode.length < 8) {
      setActivationCodeStatus(ImageInput.Status.WARNING);
    } else {
      setActivationCodeStatus(ImageInput.Status.NONE);
    }
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
            status={passwordStatus}
          />
        </ImageInputSet>
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
          onClick={() => {}}
          disabled={!usernameValid || !passwordValid ||
            !confirmPasswordValid || !activationCodeValid}>
          Register
        </AJButton>
        <AJButton
          type="text"
          onClick={() => {}}>
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
