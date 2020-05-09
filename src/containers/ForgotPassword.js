/**
 * ForgotPassword component for users to change their password when forgotten.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../utils/auth';
import HomeNavBar from '../components/home/HomeNavBar';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  user: state.auth.user
});

const ForgotPassword = ({ auth = {}, user = {} }) => {
  const { signedIn } = auth;
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-forgot-password">
      <HomeNavBar excludeHeaders={["about", "testimonials"]}/>
    </div>
  );
};

ForgotPassword.propTypes = {
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

export default connect(mapStateToProps)(ForgotPassword);
