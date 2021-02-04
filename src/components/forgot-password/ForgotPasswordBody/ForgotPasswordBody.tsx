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
import { createForgotPasswordCode, ForgotPasswordEmailData } from '../../../redux/modules/auth';
import { useDispatch } from 'react-redux';

type Props = {};

const ForgotPasswordBody: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<ImageInputStatus>(ImageInputStatus.NONE);
  const [emailValid, setEmailValid] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

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
    const forgotPasswordEmailData: ForgotPasswordEmailData = await (dispatch(
      createForgotPasswordCode(email)
    ) as ForgotPasswordEmailData);

    if (forgotPasswordEmailData.forgotPasswordCode) {
    } else {
      setErrorStatus(`Failed to create a forgot password code. ${forgotPasswordEmailData.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="sxctf-forgot-password-body">
      <div>
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
        {errorStatus && <p className="errorStatus">{errorStatus}</p>}
        <div className="form-buttons">
          <AJButton type="contained" onClick={onClickSend} disabled={!emailValid || loading}>
            Send
          </AJButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordBody;
