/**
 * ForgotPassword component for users to enter their email address to request a
 * "forgot password code".
 *
 * I dont want you to be perfect, I want you to be... you.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import ForgotPasswordBody from '../../components/forgot-password/ForgotPasswordBody';
import { RootState } from '../../redux/types';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useSetTitle } from '../../hooks/shared';

type Props = {};

const useStyles = createUseStyles(styles);

const ForgotPassword: React.FunctionComponent<Props> = () => {
  useSetTitle('SaintsXCTF');

  const classes = useStyles();

  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useEffect(() => {
    if (userAuthenticated(users, auth.signedInUser)) {
      navigate('/dashboard');
    }
  }, [users, auth.signedInUser, navigate]);

  return (
    <div className={classes.forgotPassword} ref={ref}>
      <NavBar includeHeaders={['home', 'register', 'signIn', 'logo']} bodyRef={ref} />
      <ForgotPasswordBody />
    </div>
  );
};

export default ForgotPassword;
