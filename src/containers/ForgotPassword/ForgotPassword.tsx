/**
 * ForgotPassword component for users to enter their email address to request a
 * "forgot password code".
 *
 * I dont want you to be perfect, I want you to be... you.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import ForgotPasswordBody from '../../components/forgot-password/ForgotPasswordBody';
import {RootState} from '../../redux/types';

type Props = {};

const ForgotPassword: React.FunctionComponent<Props> = () => {
  const history = useHistory();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useEffect(() => {
    if (userAuthenticated(users, auth.signedInUser)) {
      history.push('/dashboard');
    }
  }, [users]);

  return (
    <div className="sxctf-forgot-password" ref={ref}>
      <NavBar includeHeaders={['home', 'register', 'signIn', 'logo']} bodyRef={ref}/>
      <ForgotPasswordBody />
    </div>
  );
};

export default ForgotPassword;
