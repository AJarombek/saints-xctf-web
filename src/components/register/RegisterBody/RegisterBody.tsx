/**
 * Component for the application registration form.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React from 'react';
import RegisterPersonalInfo from '../RegisterPersonalInfo/RegisterPersonalInfo';
import RegisterCredentials from '../RegisterCredentials/RegisterCredentials';
import { RootState } from '../../../redux/types';
import RegisterComplete from '../RegisterComplete';
import { useSelector } from 'react-redux';

interface Props {
  stage: number;
}

const RegisterBody: React.FunctionComponent<Props> = ({ stage }) => {
  const registration = useSelector((state: RootState) => state.registration);

  function renderStage(): JSX.Element {
    switch (stage) {
      case 0:
        return <RegisterPersonalInfo registration={registration} />;
      case 1:
        return <RegisterCredentials registration={registration} />;
      case 2:
        return <RegisterComplete registration={registration} />;
      default:
        return <RegisterPersonalInfo registration={registration} />;
    }
  }

  return <div className="sxctf-register-body">{renderStage()}</div>;
};

export default RegisterBody;
