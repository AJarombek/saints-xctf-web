/**
 * Form for entering an email or username which will send a forgot password code.
 * -- dotty & lily give you a virtual hug --
 * @author Andrew Jarombek
 * @since 5/21/2020
 */

import React, { ChangeEvent, useState } from 'react';

import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import emailLogo from '../../../../assets/email.png';
import { createForgotPasswordCode } from '../../../redux/modules/auth';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../shared/LoadingSpinner';
import classNames from 'classnames';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPasswordBody: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [emailValid, setEmailValid] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setEmail(value);

    if (value.length > 0) {
      setEmailStatus(ImageInputStatus.NONE);
      setEmailValid(true);
    } else {
      setEmailStatus(ImageInputStatus.WARNING);
      setEmailValid(false);
    }
  };

  const onClickSend = async (): Promise<void> => {
    setLoading(true);
    setErrorStatus(null);
    const forgotPasswordCreated = await dispatch(createForgotPasswordCode(email));

    if (forgotPasswordCreated) {
      setEmailSent(true);
    } else {
      setErrorStatus('Failed to create a forgot password code.');
      setEmailSent(false);
    }

    setLoading(false);
  };

  return (
    <div className="sxctf-forgot-password-body">
      <div>
        {!emailSent && (
          <>
            <h2>Forgot Password</h2>
            <h5>Enter your Email Address or Username to receive a reset code:</h5>
            <ImageInput
              onChange={onChangeEmail}
              icon={emailLogo}
              placeholder="Email or Username"
              name="email"
              type="text"
              autoComplete=""
              maxLength={50}
              status={emailStatus}
            />
            {errorStatus && (
              <p className="errorStatus" data-puppeteer="errorStatus">
                {errorStatus}
              </p>
            )}
            <div className="form-buttons">
              <AJButton
                type="contained"
                onClick={onClickSend}
                disabled={!emailValid || loading}
                className={classNames(classes.button, loading && classes.disabledButton)}
              >
                <p>{loading ? 'Sending...' : 'Send'}</p>
                {loading && <LoadingSpinner className={classes.buttonSpinner} />}
              </AJButton>
            </div>
          </>
        )}
        {emailSent && (
          <>
            <div className={classes.checkedIcon} data-puppeteer="checkedIcon">
              <p>&#x4e;</p>
            </div>
            <h5 className={classes.successDescription}>
              An email was sent to your email address with a forgot password code.
            </h5>
            <p className={classes.enterCode} onClick={(): void => history.push('/forgotpassword/reset')}>
              Enter Code
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordBody;
