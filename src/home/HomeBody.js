/**
 * Home body containing action buttons.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React from 'react';
import { AJButton } from 'jarombek-react-components';

const HomeBody = () => {
  return (
    <div className="sxctf-home-body">
      <div>
        <h2>Cross Country and Track & Field Team Exercise Logs</h2>
        <div className="options">
          <AJButton type="contained">Try the Demo</AJButton>
          <AJButton type="text">Get Started</AJButton>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
