/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, { useState, useEffect } from 'react';
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
  const [iconStatus, setIconStatus] = useState(ImageInput.Status.NONE);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    let message;
    switch (status) {
      case "INVALID PASSWORD":
      case "INVALID USER":
        message = "Invalid username and password combination.";
        setErrorStatus(message);
        setIconStatus(ImageInput.Status.FAILURE);
        break;
      case "INTERNAL ERROR":
        message =  "An unexpected error occurred.  " +
          "Contact andrew@jarombek.com if this error persists.";
        setErrorStatus(message);
        setIconStatus(ImageInput.Status.FAILURE);
        break;
      default:
        setErrorStatus(null);
        setIconStatus(ImageInput.Status.NONE);
    }
  }, [status]);

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
              status={iconStatus}
            />
            <ImageInput
              onChange={(e) => setPassword(e.target.value)}
              icon={passwordLogo}
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              status={iconStatus}
            />
          </ImageInputSet>
        </div>
        { errorStatus && <p className="errorStatus">{errorStatus}</p> }
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
