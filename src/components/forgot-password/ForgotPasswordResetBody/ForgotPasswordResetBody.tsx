import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from '../ForgotPasswordBody/styles';
import { useLocation } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ValidateForgotPasswordCode } from '../../../redux/types';
import { validateForgotPasswordCode } from '../../../redux/modules/auth';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPasswordResetBody: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const location = useLocation();

  const dispatch = useDispatch();
  const codeValidation = useSelector((state: RootState) => state.auth.validateForgotPasswordCode);

  const [enteredCode, setEnteredCode] = useState('');

  const urlForgotPasswordCode: string = useMemo(() => {
    const queryStrings: ParsedQuery = qs.parse(location.search);
    return queryStrings.code as string;
  }, [location.search]);

  const urlForgotPasswordCodeValidation: ValidateForgotPasswordCode = useMemo(() => {
    if (urlForgotPasswordCode) {
      return codeValidation[urlForgotPasswordCode];
    } else {
      return null;
    }
  }, [urlForgotPasswordCode, codeValidation]);

  useEffect(() => {
    if (urlForgotPasswordCode && !urlForgotPasswordCodeValidation) {
      dispatch(validateForgotPasswordCode(urlForgotPasswordCode));
    }
  }, [urlForgotPasswordCode, urlForgotPasswordCodeValidation, dispatch]);

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
