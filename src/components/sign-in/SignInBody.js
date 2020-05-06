/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AJButton } from 'jarombek-react-components';
import ImageInput from '../shared/ImageInput';
import ImageInputSet from '../shared/ImageInputSet';

const SignInBody = ({ signIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sxctf-sign-in-body">
      <div>
        <h2>Sign In</h2>
        <div>
          <ImageInputSet>
            <ImageInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Email"
              name="username"
              type="text"
            />
            <ImageInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
              type="password"
            />
          </ImageInputSet>
        </div>
        <Link to="/forgotpassword">Forgot Password?</Link>
        <div>
          <AJButton type="contained" onClick={() => signIn(username, password)}>Sign In</AJButton>
          <AJButton type="text">Create Account</AJButton>
        </div>
      </div>
    </div>
  );
};

SignInBody.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default SignInBody;