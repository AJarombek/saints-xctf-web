/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../redux/modules/auth';
import { userAuthenticated } from '../utils/auth';
import HomeNavBar from '../components/home/HomeNavBar';
import SignInBody from '../components/sign-in/SignInBody';

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

const mapDispatchToProps = {
  signInUser: signIn
};

const SignIn = ({ auth = {}, user = {}, signInUser }) => {
  const { isFetching = false, signedIn, status } = auth;
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn   )) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-sign-in">
      <HomeNavBar excludeHeaders={["signIn", "about", "testimonials"]}/>
      <SignInBody signIn={signInUser} isFetching={isFetching} status={status}/>
    </div>
  );
};

SignIn.propTypes = {
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
  }),
  signInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
