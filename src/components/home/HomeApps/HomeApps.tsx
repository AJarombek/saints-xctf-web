/**
 * Section of the home page listing the different apps that SaintsXCTF is available on.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';
import { FeatureFlag } from '../../shared/FeatureFlag';

const HomeApps: React.FunctionComponent = () => {
  return (
    <div className="sxctf-home-apps">
      <p>SaintsXCTF has iOS and Android apps in these app stores</p>
      <div className="app-stores">
        <a href="#">
          <figure>
            <img src="/asset/app-store.png" alt="" />
          </figure>
        </a>
        <FeatureFlag flag="ANDROID_APPS">
          <a href="#">
            <figure>
              <img src="/asset/google-play-store.svg" alt="" />
            </figure>
          </a>
          <a href="#">
            <figure>
              <img src="/asset/amazon-app-store.png" alt="" />
            </figure>
          </a>
        </FeatureFlag>
      </div>
    </div>
  );
};

export default HomeApps;
