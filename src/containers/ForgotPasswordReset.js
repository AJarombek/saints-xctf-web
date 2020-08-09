/**
 * ForgotPasswordReset component for users to change their password when entering
 * a proper "forgot password code".
 *
 * You give and help me so much more than you think.
 * @author Andrew Jarombek
 * @since 5/18/2020
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../utils/auth';
import NavBar from '../components/shared/NavBar';
import ForgotPasswordResetBody from '../components/forgot-password/ForgotPasswordResetBody';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  user: state.auth.user
});

const ForgotPasswordReset = ({ auth = {}, user = {} }) => {
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, auth.signedInUser)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-forgot-password-reset">
      <NavBar includeHeaders={["home", "register", "signIn", "logo"]}/>
      <ForgotPasswordResetBody/>
    </div>
  );
};

ForgotPasswordReset.propTypes = {
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
  forgotPassword: PropTypes.shape({
    reset: PropTypes.shape({
      isFetching: PropTypes.bool,
      lastUpdated: PropTypes.number,
      status: PropTypes.string,
      serverError: PropTypes.string
    })
  })
};

export default connect(mapStateToProps)(ForgotPasswordReset);
