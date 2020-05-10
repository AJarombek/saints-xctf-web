/**
 * Register component for people to create new accounts.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../utils/auth';
import NavBar from '../components/shared/NavBar';
import RegisterBody from '../components/register/RegisterBody';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  user: state.auth.user,
  registration: state.auth.registration
});

const Register = ({ auth = {}, user = {}, registration = {} }) => {
  const { signedIn } = auth;
  const { stage } = registration;

  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-register">
      <NavBar includeHeaders={["home", "signIn", "logo"]}/>
      <RegisterBody stage={stage}/>
    </div>
  );
};

Register.propTypes = {
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

export default connect(mapStateToProps)(Register);
