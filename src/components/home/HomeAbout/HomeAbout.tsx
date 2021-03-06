/**
 * Section of the home page describing the application.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';

const HomeAbout: React.FunctionComponent = () => {
  return (
    <div id="about" className="sxctf-home-about">
      <div className="description">
        <p>
          SaintsXCTF was created during my time running Cross Country & Track at St. Lawrence University. The team
          needed a training log where coaches and athletes could view and comment on each others workouts. A shared
          logging platform was especially useful during summer training when the team was apart.
        </p>
        <p>
          SaintsXCTF has become a sophisticated exercise logging platform, accessible from the web and mobile devices. I
          hope SaintsXCTF is a useful and fun tool for your teams needs.
        </p>
      </div>
      <p className="signature">Andrew Jarombek</p>
      <p className="print">Andrew Jarombek, Application Creator</p>
    </div>
  );
};

export default HomeAbout;
