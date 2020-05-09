/**
 * Component for the application registration form.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageInputSet from '../shared/ImageInputSet';
import ImageInput from '../shared/ImageInput';
import { useHistory } from 'react-router-dom';
import { AJButton } from 'jarombek-react-components';

const RegisterBody = ({  }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  return (
    <div className="sxctf-register-body">
      <div>
        <h2>Register</h2>
        <div>
          <ImageInputSet>
            <ImageInput
              onChange={(e) => setFirstName(e.target.value)}
              icon={null}
              placeholder="First Name"
              name="firstName"
              type="text"
              autoComplete="firstName"
              status={ImageInput.Status.NONE}
            />
            <ImageInput
              onChange={(e) => setLastName(e.target.value)}
              icon={null}
              placeholder="Last Name"
              name="lastName"
              type="text"
              autoComplete=""
              status={ImageInput.Status.NONE}
            />
          </ImageInputSet>
          <ImageInput
            onChange={(e) => setEmail(e.target.value)}
            icon={passwordLogo}
            placeholder="Email"
            name="email"
            type="text"
            autoComplete=""
            status={ImageInput.Status.NONE}
          />
        </div>
        <div className="form-buttons">
          <AJButton
            type="contained"
            onClick={() => {}}
            disabled={
              loading || firstName.length === 0 || lastName.length === 0 || email.length === 0
            }>
            Continue
          </AJButton>
          <AJButton
            type="text"
            onClick={() => history.push('/signin')}>
            Existing User?  Sign In
          </AJButton>
        </div>
      </div>
    </div>
  );
};

RegisterBody.propTypes = {

};

export default RegisterBody;
