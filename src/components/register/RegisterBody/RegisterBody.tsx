/**
 * Component for the application registration form.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React from 'react';
import RegisterPersonalInfo from '../RegisterPersonalInfo/RegisterPersonalInfo';
import RegisterCredentials from '../RegisterCredentials/RegisterCredentials';
import { RegistrationState } from '../../../redux/types';

interface Props {
  stage: number;
  registration: RegistrationState;
}

const RegisterBody: React.FunctionComponent<Props> = ({ stage, registration }) => {
  function renderStage(): JSX.Element {
    switch (stage) {
      case 0:
        return <RegisterPersonalInfo registration={registration} />;
      case 1:
        return <RegisterCredentials registration={registration} />;
      case 2:
        return <></>;
      default:
        return <RegisterPersonalInfo registration={registration} />;
    }
  }

  return <div className="sxctf-register-body">{renderStage()}</div>;
};

export default RegisterBody;
