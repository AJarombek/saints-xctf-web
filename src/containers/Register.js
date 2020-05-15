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
import { signIn } from '../redux/modules/auth';
import {
  registerPersonalInfo,
  registerCredentials,
  registerBack
} from '../redux/modules/registration';

const mapStateToProps = state => ({
  auth: state.auth.auth,
  user: state.auth.user,
  registration: state.registration
});

const mapDispatchToProps = {
  registerPersonalInfo,
  registerCredentials,
  registerBack
};

const Register = ({ auth = {}, user = {}, registration = {}, registerPersonalInfo,
                    registerCredentials, registerBack }) => {
  const { signedIn } = auth;
  const { stage = 0 } = registration;

  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-register">
      <NavBar includeHeaders={["home", "signIn", "logo"]}/>
      <RegisterBody
        stage={stage}
        registerPersonalInfo={registerPersonalInfo}
        registerCredentials={registerCredentials}
        registerBack={registerBack}
        registration={registration}
      />
    </div>
  );
};

Register.propTypes = {
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
  registration: PropTypes.shape({
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    valid: PropTypes.bool,
    status: PropTypes.string,
    stage: PropTypes.number,
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string
  }),
  registerPersonalInfo: PropTypes.func.isRequired,
  registerCredentials: PropTypes.func.isRequired,
  registerBack: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
