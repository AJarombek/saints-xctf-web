/**
 * Home component displayed when no user is singed in and the website is accessed.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React from 'react';
import HomeNavBar from './HomeNavBar';
import HomeBody from './HomeBody';
import HomeAbout from './HomeAbout';
import HomeApps from './HomeApps';
import HomeTestimonials from './HomeTestimonials';
import HomeFooter from './HomeFooter';
import saints_xctf_vid from '../../assets/saints-xctf-vid.mp4';

const Home = () => {
  return (
    <div className="sxctf-home">
      <HomeNavBar/>
      <HomeBody/>
      <div className="sxctf-home-overlay"> </div>
      <video autoPlay loop muted playsInline src={saints_xctf_vid}> </video>
      <HomeAbout/>
      <HomeApps/>
      <HomeTestimonials/>
      <HomeFooter/>
    </div>
  );
};

export default Home;
