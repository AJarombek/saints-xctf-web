import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from '../ForgotPasswordBody/styles';
import { useLocation } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPasswordResetBody: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const location = useLocation();

  const [enteredCode, setEnteredCode] = useState('');

  const urlForgotPasswordCode = useMemo(() => {
    const queryStrings: ParsedQuery = qs.parse(location.search);
    return queryStrings.code;
  }, [location.search]);

  const forgotPasswordCode = useMemo(() => {
    if (urlForgotPasswordCode) {
      return urlForgotPasswordCode;
    } else {
      return enteredCode;
    }
  }, [urlForgotPasswordCode, enteredCode]);

  return (
    <div className="sxctf-forgot-password-reset-body">
      <div>
        <h2>Reset Password</h2>
        <h5>Email sent! Create a new password with the verification code sent to your email.</h5>
      </div>
    </div>
  );
};

export default ForgotPasswordResetBody;
