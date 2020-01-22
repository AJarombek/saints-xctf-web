/**
 * Section of the home page describing the application.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';

const HomeAbout = () => {
  return (
    <div className="sxctf-home-about">
      <div className="description">
        <p>
          SaintsXCTF was created during my time running Cross Country & Track at St. Lawrence
          University.  The team needed a training log where coaches and athletes could view and
          comment on each others workouts.  We knew that a shared logging platform would be especially
          useful during summer training when the team was apart.
        </p>
        <p>
          What started as a spare time project during my Senior year of college has transformed into a
          sophisticated exercise logging platform both on the web and mobile devices.  I hope you and
          your team finds SaintsXCTF to be a helpful and fun tool.
        </p>
      </div>
      <p className="signature">Andrew Jarombek</p>
      <p className="print">Andrew Jarombek, Application Creator</p>
    </div>
  );
};

export default HomeAbout;
