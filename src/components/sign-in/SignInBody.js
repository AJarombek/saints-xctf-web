/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { AJButton } from 'jarombek-react-components';
import ImageInput from '../shared/ImageInput';
import ImageInputSet from '../shared/ImageInputSet';
import usernameLogo from '../../../assets/username.png';
import passwordLogo from '../../../assets/password.png';

const SignInBody = ({ signIn, isFetching, status }) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickSignIn = async () => {
    setLoading(true);
    await signIn(username, password);
    setLoading(false);
  };

  return (
    <div className="sxctf-sign-in-body">
      <div>
        <h2>Sign In</h2>
        <div>
          <ImageInputSet>
            <ImageInput
              onChange={(e) => setUsername(e.target.value)}
              icon={usernameLogo}
              placeholder="Username or Email"
              name="username"
              type="text"
              autoComplete="username"
              status={ImageInput.Status.NONE}
            />
            <ImageInput
              onChange={(e) => setPassword(e.target.value)}
              icon={passwordLogo}
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              status={ImageInput.Status.NONE}
            />
          </ImageInputSet>
        </div>
        <Link to="/forgotpassword">Forgot Password?</Link>
        <div className="form-buttons">
          <AJButton
            type="contained"
            onClick={onClickSignIn}
            disabled={isFetching || loading || username.length === 0 || password.length === 0}>
            Sign In
          </AJButton>
          <AJButton
            type="text"
            onClick={() => history.push('/register')}>
            Create Account
          </AJButton>
        </div>
      </div>
    </div>
  );
};

SignInBody.propTypes = {
  signIn: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  status: PropTypes.string
};

export default SignInBody;
