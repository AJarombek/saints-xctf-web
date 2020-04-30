/**
 * Home component displayed when no user is singed in and the website is accessed.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React from 'react';
import moment from 'moment';

import HomeNavBar from './HomeNavBar';
import HomeBody from './HomeBody';
import HomeAbout from './HomeAbout';
import HomeApps from './HomeApps';
import HomeTestimonials from './HomeTestimonials';
import HomeFooter from './HomeFooter';
import saints_xctf_vid from '../../assets/saints-xctf-vid.mp4';

const Home = () => {
  const day = moment().dayOfYear();
  const mobileBackgroundPicture = day % 2 === 0 ?
    'https://asset.saintsxctf.com/mens-background.jpg' :
    'https://asset.saintsxctf.com/womens-background.jpg';

  return (
    <div className="sxctf-home">
      <HomeNavBar/>
      <HomeBody/>
      <div className="sxctf-home-overlay"> </div>
      <img className="sxctf-home-background-img" src={mobileBackgroundPicture} alt="" />
      <video
        className="sxctf-home-background-video"
        src={saints_xctf_vid}
        autoPlay
        loop
        muted
        playsInline />
      <HomeAbout/>
      <HomeApps/>
      <HomeTestimonials/>
      <HomeFooter/>
    </div>
  );
};

export default Home;
