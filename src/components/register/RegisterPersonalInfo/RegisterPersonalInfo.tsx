/**
 * RegisterPersonalInfo component for the first stage of people creating new accounts.  In this
 * stage, users enter their name and email.  The email is checked for existing accounts.
 *
 * Still do.  But I know some things are beyond my control.  And you must pursue your hearts call.
 * @author Andrew Jarombek
 * @since 5/11/2020
 */

import { AJButton } from 'jarombek-react-components';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import { registerPersonalInfo } from '../../../redux/modules/registration';
import emailLogo from '../../../../assets/email.png';
import ImageInputSet from '../../shared/ImageInputSet';
import ImageInput from '../../shared/ImageInput';
import {RegistrationState} from '../../../redux/types';

interface Props {
  registration: RegistrationState;
}

const RegisterPersonalInfo: React.FunctionComponent<Props> = ({ registration }) => {
  const history = useHistory();
  
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(registration.first || '');
  const [lastName, setLastName] = useState(registration.last || '');
  const [email, setEmail] = useState(registration.email || '');
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(ImageInput.Status.NONE);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    let message;
    switch (registration.status) {
    case 'USER ALREADY EXISTS':
      message = 'A user already exists with this email.';
      setErrorStatus(message);
      setEmailStatus(ImageInput.Status.FAILURE);
      break;
    case 'INTERNAL ERROR':
      message =  'An unexpected error occurred.  ' +
          'Contact andrew@jarombek.com if this error persists.';
      setErrorStatus(message);
      setEmailStatus(ImageInput.Status.NONE);
      break;
    default:
      setErrorStatus(null);
      setEmailStatus(ImageInput.Status.NONE);
    }

    setLoading(false);

  }, [registration.status]);

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
    await dispatch(registerPersonalInfo(firstName, lastName, email));
  };

  return (
    <div className="sxctf-register-personal-info">
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
            maxLength={30}
            status={ImageInput.Status.NONE}
          />
          <ImageInput
            onChange={(e) => setLastName(e.target.value)}
            icon={null}
            placeholder="Last Name"
            name="lastName"
            type="text"
            autoComplete=""
            maxLength={30}
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
          maxLength={50}
          status={emailStatus}
        />
      </div>
      { errorStatus && <p className="errorStatus">{errorStatus}</p> }
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

export default RegisterPersonalInfo;
