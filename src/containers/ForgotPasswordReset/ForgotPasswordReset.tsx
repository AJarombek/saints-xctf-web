/**
 * ForgotPasswordReset component for users to change their password when entering
 * a proper "forgot password code".
 *
 * You give and help me so much more than you think.
 * @author Andrew Jarombek
 * @since 5/18/2020
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import ForgotPasswordResetBody from '../../components/forgot-password/ForgotPasswordResetBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import { useSetTitle } from '../../hooks/shared';

type Props = {};

const ForgotPasswordReset: React.FunctionComponent<Props> = () => {
  useSetTitle('SaintsXCTF');

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
    <div className="sxctf-forgot-password-reset" ref={ref}>
      <NavBar includeHeaders={['home', 'register', 'signIn', 'logo']} bodyRef={ref} />
      <ForgotPasswordResetBody />
    </div>
  );
};

export default ForgotPasswordReset;
