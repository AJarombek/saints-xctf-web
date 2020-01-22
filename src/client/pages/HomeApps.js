/**
 * Section of the home page listing the different apps that SaintsXCTF is available on.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';

const HomeApps = () => {
  return (
    <div className="sxctf-home-apps">
      <p>SaintsXCTF has iOS and Android apps in these app stores</p>
      <div className="app-stores">
        <figure>
          <img src="https://assets.saintsxctf.com/ios-appstore.png"/>
        </figure>
        <figure>
          <img src="https://assets.saintsxctf.com/android-playstore.png"/>
        </figure>
        <figure>
          <img src="https://assets.saintsxctf.com/android-amazon.png"/>
        </figure>
      </div>
    </div>
  );
};

export default HomeApps;
