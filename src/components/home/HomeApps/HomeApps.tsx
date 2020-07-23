/**
 * Section of the home page listing the different apps that SaintsXCTF is available on.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';

const HomeApps: React.FunctionComponent = () => {
  return (
    <div className="sxctf-home-apps">
      <p>SaintsXCTF has iOS and Android apps in these app stores</p>
      <div className="app-stores">
        <a href="#">
          <figure>
            <img src="https://asset.saintsxctf.com/app-store.png"/>
          </figure>
        </a>
        <a href="#">
          <figure>
            <img src="https://asset.saintsxctf.com/google-play-store.svg"/>
          </figure>
        </a>
        <a href="#">
          <figure>
            <img src="https://asset.saintsxctf.com/amazon-app-store.png"/>
          </figure>
        </a>
      </div>
    </div>
  );
};

export default HomeApps;
