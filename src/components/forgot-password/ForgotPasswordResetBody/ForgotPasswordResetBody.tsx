import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ValidateForgotPasswordCode } from '../../../redux/types';
import {
  ChangePasswordResult,
  changeUserPassword,
  validateForgotPasswordCode,
  ValidateForgotPasswordResult,
} from '../../../redux/modules/auth';
import ImageInput, { ImageInputStatus } from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';
import NotFound from '../../shared/NotFound';
import ImageInputSet, { ImageInputDirection } from '../../shared/ImageInputSet';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import passwordLogo from '../../../../assets/password.png';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPasswordResetBody: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const codeValidation = useSelector((state: RootState) => state.auth.validateForgotPasswordCode);

  const [enteredCode, setEnteredCode] = useState('');
  const [enteredCodeStatus, setEnteredCodeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [validatingCode, setValidatingCode] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [submittingNewPassword, setSubmittingNewPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

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

  const forgotPasswordCodeUsername: string = useMemo(() => {
    return codeValidation[forgotPasswordCode]?.username;
  }, [codeValidation, forgotPasswordCode]);

  const onChangeVerificationCode = (e: ChangeEvent<HTMLInputElement>): void => {
    const newCode = e.target.value;
    setEnteredCode(newCode);

    if (!newCode.length) {
      setEnteredCodeStatus(ImageInputStatus.WARNING);
    } else {
      setEnteredCodeStatus(ImageInputStatus.NONE);
    }

    if (errorStatus) {
      setErrorStatus(null);
    }
  };

  const onVerify = async (): Promise<void> => {
    setValidatingCode(true);
    const { isValid, error } = (await dispatch(
      validateForgotPasswordCode(enteredCode),
    )) as ValidateForgotPasswordResult;
    setValidatingCode(false);

    if (!isValid) {
      setEnteredCodeStatus(ImageInputStatus.FAILURE);
      setErrorStatus(error);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newChangedPassword = e.target.value;
    setPassword(newChangedPassword);

    const lengthValid = newChangedPassword.length >= 8;
    const valueValid = newChangedPassword === passwordConfirm;

    const status = lengthValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;
    const confirmStatus = valueValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setPasswordStatus(status);
    setPasswordValid(lengthValid);

    setPasswordConfirmStatus(confirmStatus);
    setConfirmPasswordValid(valueValid);

    if (errorStatus) {
      setErrorStatus(null);
    }
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newChangedConfirmPassword = e.target.value;
    setPasswordConfirm(newChangedConfirmPassword);

    const isValid = newChangedConfirmPassword === password;
    const status = isValid ? ImageInputStatus.NONE : ImageInputStatus.WARNING;

    setPasswordConfirmStatus(status);
    setConfirmPasswordValid(isValid);

    if (errorStatus) {
      setErrorStatus(null);
    }
  };

  const onSubmitNewPassword = async (): Promise<void> => {
    if (password !== passwordConfirm) {
      setPasswordStatus(ImageInputStatus.FAILURE);
      setPasswordConfirmStatus(ImageInputStatus.FAILURE);
    } else {
      setPasswordStatus(ImageInputStatus.NONE);
      setPasswordConfirmStatus(ImageInputStatus.NONE);
      setSubmittingNewPassword(true);
      const { passwordUpdated, error } = (await dispatch(
        changeUserPassword(forgotPasswordCodeUsername, forgotPasswordCode, password),
      )) as ChangePasswordResult;

      if (passwordUpdated) {
        setPasswordChanged(true);
      } else {
        setSubmittingNewPassword(false);
        setErrorStatus(error);
      }
    }
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
            <Link to="/forgotpassword" className={classes.link} data-cypress="requestCode">
              Request Another Code
            </Link>
            <div className="form-buttons">
              <AJButton type="text" onClick={(): void => navigate('/')}>
                Cancel
              </AJButton>
              <AJButton type="contained" onClick={onVerify} disabled={validatingCode}>
                Submit
              </AJButton>
            </div>
          </>
        )}
        {!forgotPasswordCodeValid && !!urlForgotPasswordCode && <NotFound fullPage={false} />}
        {forgotPasswordCodeValid && !passwordChanged && (
          <>
            <h2>Reset Password</h2>
            <h5>Enter a new password for your SaintsXCTF account.</h5>
            <ImageInputSet direction={ImageInputDirection.ROW}>
              <ImageInput
                onChange={onChangePassword}
                icon={passwordLogo}
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                maxLength={80}
                status={passwordStatus}
                useCustomValue={true}
                value={password}
              />
              <ImageInput
                onChange={onChangeConfirmPassword}
                icon={passwordLogo}
                placeholder="Confirm Password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                maxLength={80}
                status={passwordConfirmStatus}
                useCustomValue={true}
                value={passwordConfirm}
              />
            </ImageInputSet>
            <p className={classes.inputTip}>Password must be 8 or more characters long.</p>
            {errorStatus && <p className="errorStatus">{errorStatus}</p>}
            <div className="form-buttons">
              <AJButton type="text" onClick={(): void => navigate('/')}>
                Cancel
              </AJButton>
              <AJButton
                type="contained"
                onClick={onSubmitNewPassword}
                disabled={submittingNewPassword || !passwordValid || !confirmPasswordValid}
              >
                Change Password
              </AJButton>
            </div>
          </>
        )}
        {forgotPasswordCodeValid && passwordChanged && (
          <>
            <div className={classes.checkedIcon} data-puppeteer="checkedIcon">
              <p>&#x4e;</p>
            </div>
            <h5 className={classes.successDescription} data-cypress="passwordResetSuccessMessage">
              Your password was successfully changed.
            </h5>
            <p className={classes.signIn} data-cypress="passwordRestSignIn" onClick={(): void => navigate('/signin')}>
              Sign In
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordResetBody;
