/**
 * Component for displaying to a new user that their registration is complete.
 * @author Andrew Jarombek
 * @since 2/23/2021
 */

import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { RegistrationState } from '../../../redux/types';
import { useNavigate } from 'react-router-dom';
import { sendWelcomeEmail } from '../../../redux/modules/registration';

interface Props {
  registration: RegistrationState;
}

const useStyles = createUseStyles(styles);

const RegisterComplete: React.FunctionComponent<Props> = ({ registration }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !registration.welcomeEmail?.emailed &&
      !registration.welcomeEmail?.isFetching &&
      !registration.welcomeEmail?.serverError
    ) {
      dispatch(sendWelcomeEmail(registration.email, registration.first, registration.last, registration.username));
    }
  }, [
    dispatch,
    registration.email,
    registration.first,
    registration.last,
    registration.username,
    registration.welcomeEmail?.emailed,
    registration.welcomeEmail?.isFetching,
    registration.welcomeEmail?.serverError,
  ]);

  return (
    <div className={classes.registerComplete} data-cypress="registerComplete">
      <div className={classes.checkedIcon}>
        <p>&#x4e;</p>
      </div>
      <h5 className={classes.successDescription}>
        You are registered! A welcome email was sent to your email address.
      </h5>
      <p className={classes.signInLink} data-cypress="signInLink" onClick={(): void => navigate('/signin')}>
        Sign In
      </p>
    </div>
  );
};

export default RegisterComplete;
