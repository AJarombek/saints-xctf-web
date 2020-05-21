/**
 * Form for entering an email or username which will send a forgot password code.
 * -- dotty & lily give you a virtual hug --
 * @author Andrew Jarombek
 * @since 5/21/2020
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import emailLogo from '../../../assets/email.png';
import ImageInput from '../shared/ImageInput';
import { AJButton } from 'jarombek-react-components';

const ForgotPasswordBody = ({ forgotPasswordEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(ImageInput.Status.NONE);
  const [emailValid, setEmailValid] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length > 0) {
      setEmailStatus(ImageInput.Status.NONE);
      setEmailValid(true);
    } else {
      setEmailStatus(ImageInput.Status.WARNING);
      setEmailValid(false);
    }
  };

  const onClickSend = async () => {
    setLoading(true);
    await forgotPasswordEmail(email);
  };

  return (
    <div className="sxctf-forgot-password-body">
      <h2>Forgot Password</h2>
      <p>Enter your Email Address or Username to receive a reset code:</p>
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
      <AJButton
        type="contained"
        onClick={onClickSend}
        disabled={!emailValid || loading}>
        Send
      </AJButton>
    </div>
  );
};

ForgotPasswordBody.propTypes = {
  forgotPasswordEmail: PropTypes.func.isRequired
};

export default ForgotPasswordBody;
