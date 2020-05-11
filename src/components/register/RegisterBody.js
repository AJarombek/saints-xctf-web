/**
 * Component for the application registration form.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import RegisterPersonalInfo from './RegisterPersonalInfo';
import RegisterCredentials from './RegisterCredentials';
import RegisterGroups from './RegisterGroups';
import RegisterTeams from './RegisterTeams';

const RegisterBody = ({ stage, registerPersonalInfo }) => {

  function renderStage() {
    switch (stage) {
      case 0:
        return <RegisterPersonalInfo />;
      case 1:
        return <RegisterCredentials />;
      case 2:
        return <RegisterGroups />;
      case 3:
        return <RegisterTeams />;
      default:
        return <RegisterPersonalInfo />;
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
  registerPersonalInfo: PropTypes.func.isRequired
};

export default RegisterBody;
