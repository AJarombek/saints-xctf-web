/**
 * Home component displayed when no user is singed in and the website is accessed.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import HomeBody from '../../components/home/HomeBody';
import HomeAbout from '../../components/home/HomeAbout';
import HomeApps from '../../components/home/HomeApps';
import HomeTestimonials from '../../components/home/HomeTestimonials';
import HomeFooter from '../../components/home/HomeFooter';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import saintsXCTFVideo from '../../../assets/saints-xctf-vid.mp4';
import { RootState } from '../../redux/types';

type Props = {};

const Home: React.FunctionComponent<Props> = () => {
  const history = useHistory();
  const auth = useSelector((state: RootState) => state.auth.auth);
  const user = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useEffect(() => {
    if (userAuthenticated(user, auth.signedInUser)) {
      history.push('/dashboard');
    }
  }, [user]);

  const day = moment().dayOfYear();
  const mobileBackgroundPicture =
    day % 2 === 0
      ? 'https://asset.saintsxctf.com/mens-background.jpg'
      : 'https://asset.saintsxctf.com/womens-background.jpg';

  if (!userAuthenticated(user, auth.signedInUser)) {
    return (
      <div className="sxctf-home" ref={ref}>
        <NavBar includeHeaders={['about', 'testimonials', 'register', 'signIn', 'logo']} bodyRef={ref} />
        <HomeBody />
        <div className="sxctf-home-overlay"> </div>
        <img className="sxctf-home-background-img" src={mobileBackgroundPicture} alt="" />
        <video className="sxctf-home-background-video" src={saintsXCTFVideo} autoPlay loop muted playsInline />
        <HomeAbout />
        <HomeApps />
        <HomeTestimonials />
        <HomeFooter />
      </div>
    );
  } else {
    return <div className="sxctf-home"> </div>;
  }
};

export default Home;
