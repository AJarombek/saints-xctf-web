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
import { AJButton } from 'jarombek-react-components';

const RegisterCredentials = ({ registration }) => {
  const [usernameStatus, setUsernameStatus] = useState(ImageInput.Status.NONE);
  const [passwordStatus, setPasswordStatus] = useState(ImageInput.Status.NONE);
  const [activationCodeStatus, setActivationCodeStatus] = useState(ImageInput.Status.NONE);
  const [errorStatus, setErrorStatus] = useState(null);

  return (
    <div className="sxctf-register-credentials">
      <h2>Register</h2>
      <div className="form-inputs">
        <ImageInput
          onChange={() => {}}
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
            onChange={() => {}}
            icon={passwordLogo}
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            maxLength={80}
            status={passwordStatus}
          />
          <ImageInput
            onChange={() => {}}
            icon={null}
            placeholder="Confirm Password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            maxLength={80}
            status={passwordStatus}
          />
        </ImageInputSet>
        <ImageInput
          onChange={() => {}}
          icon={null}
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
          disabled={false}>
          Register
        </AJButton>
        <AJButton
          type="text"
          onClick={() => {}}>
          Back to Personal Information
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
  })
};

export default RegisterCredentials;
