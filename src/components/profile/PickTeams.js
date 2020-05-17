/**
 * Component for users to pick teams they want to be members of.
 * @author Andrew Jarombek
 * @since 5/16/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import {AJTag} from 'jarombek-react-components';

const PickTeams = () => {
  return (
    <div className="sxctf-pick-teams">
      <h2>Welcome to SaintsXCTF!</h2>
      <div className="current-team">
        <p>You are a member of</p>
        <AJTag content="St. Lawrence University" color="rgba(153, 0, 0, 0.4)"/>
      </div>
      <div className="team-selection">

      </div>
    </div>
  );
};

PickTeams.propTypes = {

};

export default PickTeams;
