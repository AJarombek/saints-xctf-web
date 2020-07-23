/**
 * Home body containing action buttons.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React from 'react';
import { AJButton } from 'jarombek-react-components';
import { FeatureFlag } from '../../shared/FeatureFlag';

const HomeBody: React.FunctionComponent = () => {
  return (
    <div className="sxctf-home-body">
      <div>
        <h2>Cross Country and Track & Field Team Exercise Logs</h2>
        <div className="options">
          <FeatureFlag flag="DEMO">
            <AJButton type="contained">Try the Demo</AJButton>
          </FeatureFlag>
          <AJButton type="text">Get Started</AJButton>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
