/**
 * Component for the application registration form.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import RegisterPersonalInfo from './RegisterPersonalInfo';
import RegisterCredentials from './RegisterCredentials';

const RegisterBody = ({ stage, registerPersonalInfo, registerCredentials, registerBack,
                        registration }) => {

  function renderStage() {
    switch (stage) {
      case 0:
        return (
          <RegisterPersonalInfo
            registerPersonalInfo={registerPersonalInfo}
            registration={registration}
          />
        );
      case 1:
        return (
          <RegisterCredentials
            registration={registration}
            registerCredentials={registerCredentials}
            registerBack={registerBack}
          />
        );
      default:
        return (
          <RegisterPersonalInfo
            registerPersonalInfo={registerPersonalInfo}
            registration={registration}
          />
        );
    }
  }

  return (
    <div className="sxctf-register-body">
      { renderStage() }
    </div>
  );
};

RegisterBody.propTypes = {
  stage: PropTypes.number.isRequired,
  registerPersonalInfo: PropTypes.func.isRequired,
  registerCredentials: PropTypes.func.isRequired,
  registerBack: PropTypes.func.isRequired,
  registration: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    valid: PropTypes.bool,
    status: PropTypes.string,
    stage: PropTypes.number,
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string
  })
};

export default RegisterBody;
