/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../redux/modules/auth';
import HomeNavBar from '../components/home/HomeNavBar';
import SignInBody from '../components/sign-in/SignInBody';

const mapStateToProps = state => ({
  signedIn: state.auth.signedIn,
  user: state.user
});

const mapDispatchToProps = {
  signInUser: signIn
};

const SignIn = ({ signedIn, user, signInUser }) => {
  return (
    <div className="sxctf-sign-in">
      <HomeNavBar excludeHeaders={["signIn"]}/>
      <SignInBody signIn={signIn}/>
    </div>
  );
};

SignIn.propTypes = {
  signedIn: PropTypes.bool,
  user: PropTypes.shape({
    activation_code: PropTypes.string,
    class_year: PropTypes.number,
    deleted: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    favorite_event: PropTypes.string,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    last_signin: PropTypes.string,
    location: PropTypes.string,
    member_since: PropTypes.string,
    password: PropTypes.string.isRequired,
    subscribed: PropTypes.string,
    username: PropTypes.string,
    week_start: PropTypes.string
  }),
  signInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
