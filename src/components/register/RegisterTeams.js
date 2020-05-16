/**
 * Register component for the second stage of people creating new accounts.  In this
 * stage, users enter a username and password.  The username is checked to see if it already exists.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const RegisterTeams = () => {
  return (
    <div className="sxctf-register-teams">
      <h2>Team Access</h2>
      <div className="current-team">

      </div>
      <div className="team-selection">

      </div>
    </div>
  );
};

export default RegisterTeams;
