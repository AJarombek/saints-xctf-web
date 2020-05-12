/**
 * RegisterCredentials component for the second stage of people creating new accounts.  In this
 * stage, users enter a username and password.  The username is checked to see if it already exists.
 * @author Andrew Jarombek
 * @since 5/12/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const RegisterCredentials = ({ registration }) => {
  return (
    <div className="sxctf-register-credentials"> </div>
  );
};

RegisterCredentials.propTypes = {
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

export default RegisterCredentials;
