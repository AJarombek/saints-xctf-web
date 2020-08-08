/**
 * ForgotPassword component for users to enter their email address to request a
 * "forgot password code".
 *
 * I dont want you to be perfect, I want you to be... you.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../utils/auth';
import NavBar from '../components/shared/NavBar';
import ForgotPasswordBody from '../components/forgot-password/ForgotPasswordBody';
import { forgotPasswordEmail } from '../redux/modules/auth';

const mapStateToProps = state => ({
  auth: state.auth?.auth ?? {},
  user: state.auth?.user ?? {},
  forgotPassword: state.auth?.forgotPassword ?? {}
});

const mapDispatchToProps = {
  forgotPasswordEmail
};

const ForgotPassword = ({ auth, user, forgotPassword, forgotPasswordEmail }) => {
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-forgot-password">
      <NavBar includeHeaders={["home", "register", "signIn", "logo"]}/>
      <ForgotPasswordBody forgotPasswordEmail={forgotPasswordEmail}/>
    </div>
  );
};

ForgotPassword.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    signedIn: PropTypes.bool,
    status: PropTypes.string
  }),
  user: PropTypes.shape({
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool,
    lastUpdated: PropTypes.number,
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
    email: PropTypes.shape({
      isFetching: PropTypes.bool,
      lastUpdated: PropTypes.number,
      status: PropTypes.string,
      serverError: PropTypes.string
    })
  }),
  forgotPasswordEmail: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
