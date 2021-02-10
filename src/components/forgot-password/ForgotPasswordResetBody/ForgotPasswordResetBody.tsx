import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ValidateForgotPasswordCode } from '../../../redux/types';
import { changeUserPassword, validateForgotPasswordCode } from '../../../redux/modules/auth';
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

  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const codeValidation = useSelector((state: RootState) => state.auth.validateForgotPasswordCode);

  const [enteredCode, setEnteredCode] = useState('');
  const [enteredCodeStatus, setEnteredCodeStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [validatingCode, setValidatingCode] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newPasswordStatus, setNewPasswordStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [newPasswordConfirmStatus, setNewPasswordConfirmStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [submittingNewPassword, setSubmittingNewPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

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
  };

  const onVerify = async (): Promise<void> => {
    setValidatingCode(true);
    const isValid = await dispatch(validateForgotPasswordCode(enteredCode));
    setValidatingCode(false);

    if (!isValid) {
      setEnteredCodeStatus(ImageInputStatus.FAILURE);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newChangedPassword = e.target.value;
    setNewPassword(newChangedPassword);

    if (!newChangedPassword.length) {
      setNewPasswordStatus(ImageInputStatus.WARNING);
    } else {
      setNewPasswordStatus(ImageInputStatus.NONE);
    }
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const newChangedConfirmPassword = e.target.value;
    setNewPasswordConfirm(newChangedConfirmPassword);

    if (!newChangedConfirmPassword.length) {
      setNewPasswordConfirmStatus(ImageInputStatus.WARNING);
    } else {
      setNewPasswordConfirmStatus(ImageInputStatus.NONE);
    }
  };

  const onSubmitNewPassword = async (): Promise<void> => {
    if (newPassword !== newPasswordConfirm) {
      setNewPasswordStatus(ImageInputStatus.FAILURE);
      setNewPasswordConfirmStatus(ImageInputStatus.FAILURE);
    } else {
      setSubmittingNewPassword(true);
      const passwordChanged = await dispatch(
        changeUserPassword(forgotPasswordCodeUsername, forgotPasswordCode, newPassword)
      );

      if (passwordChanged) {
        setPasswordChanged(true);
      }

      setSubmittingNewPassword(false);
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
            <Link to="/forgotpassword" className={classes.link}>
              Request Another Code
            </Link>
            <div className="form-buttons">
              <AJButton type="text" onClick={(): void => history.push('/')}>
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
                status={newPasswordStatus}
                useCustomValue={true}
                value={newPassword}
              />
              <ImageInput
                onChange={onChangeConfirmPassword}
                icon={passwordLogo}
                placeholder="Confirm Password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                maxLength={80}
                status={newPasswordConfirmStatus}
                useCustomValue={true}
                value={newPasswordConfirm}
              />
            </ImageInputSet>
            <p className={classes.inputTip}>Password must be 8 or more characters long.</p>
            <div className="form-buttons">
              <AJButton type="text" onClick={(): void => history.push('/')}>
                Cancel
              </AJButton>
              <AJButton type="contained" onClick={onSubmitNewPassword} disabled={submittingNewPassword}>
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
            <h5 className={classes.successDescription}>Your password was successfully changed.</h5>
            <p className={classes.signIn} onClick={(): void => history.push('/signin')}>
              Sign In
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordResetBody;
