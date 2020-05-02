/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React from 'react';
import HomeNavBar from '../home/HomeNavBar';
import SignInBody from './SignInBody';

const SignIn = () => {
  return (
    <div className="sxctf-sign-in">
      <HomeNavBar/>
      <SignInBody/>
    </div>
  );
};

export default SignIn;
