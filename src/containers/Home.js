/**
 * Home component displayed when no user is singed in and the website is accessed.
 * @author Andrew Jarombek
 * @since 1/12/2020
 */

import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../utils/auth';
import HomeNavBar from '../components/home/HomeNavBar';
import HomeBody from '../components/home/HomeBody';
import HomeAbout from '../components/home/HomeAbout';
import HomeApps from '../components/home/HomeApps';
import HomeTestimonials from '../components/home/HomeTestimonials';
import HomeFooter from '../components/home/HomeFooter';
import saints_xctf_vid from '../../assets/saints-xctf-vid.mp4';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  user: state.auth.user
});

const Home = ({ auth = {}, user = {} }) => {
  const { isFetching = false, signedIn, status } = auth;
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn)) {
      history.push('/dashboard');
    }
  }, [user]);

  const day = moment().dayOfYear();
  const mobileBackgroundPicture = day % 2 === 0 ?
    'https://asset.saintsxctf.com/mens-background.jpg' :
    'https://asset.saintsxctf.com/womens-background.jpg';

  return (
    <div className="sxctf-home">
      <HomeNavBar excludeHeaders={["home"]}/>
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

Home.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    signedIn: PropTypes.bool,
    status: PropTypes.string
  }),
  user: PropTypes.shape({
    activation_code: PropTypes.string,
    class_year: PropTypes.number,
    deleted: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    favorite_event: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
    last_signin: PropTypes.string,
    location: PropTypes.string,
    member_since: PropTypes.string,
    password: PropTypes.string,
    subscribed: PropTypes.string,
    username: PropTypes.string,
    week_start: PropTypes.string
  })
};

export default connect(mapStateToProps)(Home);
