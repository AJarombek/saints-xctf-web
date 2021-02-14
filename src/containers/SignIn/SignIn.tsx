/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signIn } from '../../redux/modules/auth';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import SignInBody from '../../components/sign-in/SignInBody';
import { RootState } from '../../redux/types';

type Props = {};

const SignIn: React.FunctionComponent<Props> = () => {
  const history = useHistory();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const ref = useRef(null);

  useEffect(() => {
    if (userAuthenticated(users, auth.signedInUser)) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...Object.values(users).filter((user) => !user.user?.isFetching && !user.user?.didInvalidate)[0]?.user,
          password: null,
          salt: null
        })
      );

      history.push('/dashboard');
    }
  }, [users, auth.signedInUser, history]);

  return (
    <div className="sxctf-sign-in" ref={ref}>
      <NavBar includeHeaders={['home', 'register', 'logo']} bodyRef={ref} />
      <SignInBody signIn={signIn} isFetching={auth.isFetching} status={auth.status} />
    </div>
  );
};

export default SignIn;
