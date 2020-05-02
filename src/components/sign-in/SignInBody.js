/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 5/2/2020
 */

import React from 'react';
import { AJButton } from 'jarombek-react-components';

const SignInBody = () => {
  return (
    <div className="sxctf-sign-in-body">
      <h2>Sign In</h2>

      <p>Forgot Password?</p>
      <div>
        <AJButton type="contained">Sign In</AJButton>
        <AJButton type="text">Create Account</AJButton>
      </div>
    </div>
  );
};

export default SignInBody;
