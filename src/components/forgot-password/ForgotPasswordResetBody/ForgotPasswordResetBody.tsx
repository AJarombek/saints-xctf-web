import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from '../ForgotPasswordBody/styles';
import { useHistory, useLocation } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ValidateForgotPasswordCode } from '../../../redux/types';
import { validateForgotPasswordCode } from '../../../redux/modules/auth';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPasswordResetBody: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const codeValidation = useSelector((state: RootState) => state.auth.validateForgotPasswordCode);

  const [enteredCode, setEnteredCode] = useState('');
  const [enteredCodeStatus, setEnteredCodeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [validatingCode, setValidatingCode] = useState(false);

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

  const forgotPasswordCodeValid: boolean = useMemo(() => {
    return codeValidation[forgotPasswordCode]?.isValid;
  }, [codeValidation, forgotPasswordCode]);

  const onChangeVerificationCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setEnteredCode(e.target.value);
  };

  const onVerify = async (): Promise<void> => {
    setValidatingCode(true);
    await dispatch(validateForgotPasswordCode(enteredCode));
    setValidatingCode(false);
  };

  return (
    <div className="sxctf-forgot-password-reset-body">
      <div>
        {!forgotPasswordCodeValid && !urlForgotPasswordCode && (
          <>
            <h2>Enter Verification Code</h2>
            <h5>A forgot password verification code was emailed to you.</h5>
            <ImageInput
              onChange={onChangeVerificationCode}
              placeholder="Verification Code"
              name="code"
              type="text"
              autoComplete=""
              maxLength={10}
              status={enteredCodeStatus}
            />
            <div className="form-buttons">
              <AJButton type="text" onClick={(): void => history.push('/forgotpassword')}>
                Request Another Code
              </AJButton>
              <AJButton type="contained" onClick={onVerify} disabled={validatingCode}>
                Submit
              </AJButton>
            </div>
          </>
        )}
        {forgotPasswordCodeValid && (
          <>
            <h2>Reset Password</h2>
            <h5>Enter a new password for your SaintsXCTF account.</h5>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordResetBody;
