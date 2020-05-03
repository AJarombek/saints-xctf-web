/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../../redux/modules/auth';
import HomeNavBar from '../home/HomeNavBar';
import SignInBody from './SignInBody';

const mapStateToProps = state => ({
  signedIn: state.auth.signedIn,
  user: state.user
});

const mapDispatchToProps = {
  signInUser: signIn
};

const SignIn = ({ signedIn, signInUser }) => {
  return (
    <div className="sxctf-sign-in">
      <HomeNavBar/>
      <SignInBody/>
    </div>
  );
};

SignIn.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  signInUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
