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
import { useHistory } from 'react-router-dom';
import { sendWelcomeEmail } from '../../../redux/modules/registration';

interface Props {
  registration: RegistrationState;
}

const useStyles = createUseStyles(styles);

const RegisterComplete: React.FunctionComponent<Props> = ({ registration }) => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!registration.welcomeEmail?.emailed) {
      dispatch(sendWelcomeEmail(registration.email, registration.first, registration.last, registration.username));
    }
  }, [
    dispatch,
    registration.email,
    registration.first,
    registration.last,
    registration.username,
    registration.welcomeEmail?.emailed
  ]);

  return (
    <div className={classes.registerComplete}>
      <div className={classes.checkedIcon}>
        <p>&#x4e;</p>
      </div>
      <h5 className={classes.successDescription}>
        You are registered! A welcome email was sent to your email address.
      </h5>
      <p className={classes.enterCode} onClick={(): void => history.push('/signin')}>
        Sign In
      </p>
    </div>
  );
};

export default RegisterComplete;
