/**
 * Form for entering an email or username which will send a forgot password code.
 * -- dotty & lily give you a virtual hug --
 * @author Andrew Jarombek
 * @since 5/21/2020
 */

import React, {ChangeEvent, useState} from 'react';
import PropTypes from 'prop-types';

import ImageInput, {ImageInputStatus} from '../../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';

// @ts-ignore
import emailLogo from '../../../../assets/email.png';

interface IProps {
  forgotPasswordEmail: Function
}

const ForgotPasswordBody: React.FunctionComponent<IProps> = ({ forgotPasswordEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(ImageInputStatus.NONE);
  const [emailValid, setEmailValid] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onClickSend = async () => {
    setLoading(true);
    await forgotPasswordEmail(email);
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
        { errorStatus && <p className="errorStatus">{errorStatus}</p> }
        <div className="form-buttons">
          <AJButton
            type="contained"
            onClick={onClickSend}
            disabled={!emailValid || loading}>
            Send
          </AJButton>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordBody.propTypes = {
  forgotPasswordEmail: PropTypes.func.isRequired
};

export default ForgotPasswordBody;
