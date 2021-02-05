/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles';
import { AJButton } from 'jarombek-react-components';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import ImageInputSet from '../../shared/ImageInputSet';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import usernameLogo from '../../../../assets/username.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import passwordLogo from '../../../../assets/password.png';

interface Props {
  signIn: Function;
  isFetching?: boolean;
  status?: string;
}

const useStyles = createUseStyles(styles);

const SignInBody: React.FunctionComponent<Props> = ({ signIn, isFetching, status }) => {
  const classes = useStyles();

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [iconStatus, setIconStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    let message;
    switch (status) {
      case 'INVALID PASSWORD':
      case 'INVALID USER':
        message = 'Invalid username and password combination.';
        setErrorStatus(message);
        setIconStatus(ImageInputStatus.FAILURE);
        break;
      case 'INTERNAL ERROR':
        message = (
          <>
            An unexpected error occurred. Contact
            <a className={classes.contactLink} href="mailto:andrew@jarombek.com">
              andrew@jarombek.com
            </a>
            if this error persists.
          </>
        );
        setErrorStatus(message);
        setIconStatus(ImageInputStatus.FAILURE);
        break;
      default:
        setErrorStatus(null);
        setIconStatus(ImageInputStatus.NONE);
    }
  }, [status, classes.contactLink]);

  const onClickSignIn = async (): Promise<void> => {
    if (username.length !== 0 && password.length !== 0) {
      setLoading(true);
      await signIn(username, password);
      setLoading(false);
    }
  };

  return (
    <div className="sxctf-sign-in-body">
      <div>
        <h2>Sign In</h2>
        <div>
          <ImageInputSet>
            <ImageInput
              onChange={(e): void => setUsername(e.target.value)}
              icon={usernameLogo}
              placeholder="Username or Email"
              name="username"
              type="text"
              autoComplete="username"
              status={iconStatus}
            />
            <ImageInput
              onChange={(e): void => setPassword(e.target.value)}
              icon={passwordLogo}
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              status={iconStatus}
            />
          </ImageInputSet>
        </div>
        {errorStatus && <p className={classNames(classes.errorStatus, 'errorStatus')}>{errorStatus}</p>}
        <Link to="/forgotpassword">Forgot Password?</Link>
        <div className="form-buttons">
          <AJButton type="contained" onClick={onClickSignIn} disabled={isFetching || loading}>
            Sign In
          </AJButton>
          <AJButton type="text" onClick={(): void => history.push('/register')}>
            Create Account
          </AJButton>
        </div>
      </div>
    </div>
  );
};

export default SignInBody;
