/**
 * RegisterPersonalInfo component for the first stage of people creating new accounts.  In this
 * stage, users enter their name and email.  The email is checked for existing accounts.
 *
 * Still do.  But I know some things are beyond my control.  And you must pursue your hearts call.
 * @author Andrew Jarombek
 * @since 5/11/2020
 */

import { AJButton } from 'jarombek-react-components';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import emailLogo from '../../../assets/email.png';
import ImageInputSet from '../shared/ImageInputSet';
import ImageInput from '../shared/ImageInput';

const RegisterPersonalInfo = ({ stage, registerPersonalInfo }) => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(ImageInput.Status.NONE);
  const [errorStatus, setErrorStatus] = useState(null);

  const emailPattern = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/;

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (emailPattern.test(email)) {
      setEmailStatus(ImageInput.Status.NONE);
    } else {
      setEmailStatus(ImageInput.Status.WARNING);
    }
  };

  const onClickContinue = async () => {
    setLoading(true);
    await registerPersonalInfo(firstName, lastName, email);
    setLoading(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <div className="form-inputs">
        <ImageInputSet direction={ImageInputSet.Direction.COLUMN}>
          <ImageInput
            onChange={(e) => setFirstName(e.target.value)}
            icon={null}
            placeholder="First Name"
            name="firstName"
            type="text"
            autoComplete="firstName"
            status={ImageInput.Status.NONE}
          />
          <ImageInput
            onChange={(e) => setLastName(e.target.value)}
            icon={null}
            placeholder="Last Name"
            name="lastName"
            type="text"
            autoComplete=""
            status={ImageInput.Status.NONE}
          />
        </ImageInputSet>
        <ImageInput
          onChange={onChangeEmail}
          icon={emailLogo}
          placeholder="Email"
          name="email"
          type="text"
          autoComplete=""
          status={emailStatus}
        />
      </div>
      <div className="form-buttons">
        <AJButton
          type="contained"
          onClick={onClickContinue}
          disabled={
            loading || firstName.length === 0 || lastName.length === 0 ||
            email.length === 0 || !emailPattern.test(email)
          }>
          Continue
        </AJButton>
        <AJButton
          type="text"
          onClick={() => history.push('/')}>
          Exit
        </AJButton>
      </div>
    </div>
  );
};

RegisterPersonalInfo.propTypes = {
  stage: PropTypes.number.isRequired,
  registration: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.object,
    valid: PropTypes.bool,
    status: PropTypes.string,
    stage: PropTypes.number,
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string
  })
};

export default RegisterPersonalInfo;
