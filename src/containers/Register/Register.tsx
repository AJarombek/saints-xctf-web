/**
 * Register component for people to create new accounts.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, {useEffect, useRef, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import RegisterBody from '../../components/register/RegisterBody/RegisterBody';
import { signIn } from '../../redux/modules/auth';
import {RootState} from '../../redux/types';

type Props = {}

const Register: React.FunctionComponent<Props> = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);
  const registration = useSelector((state: RootState) => state.registration);

  const [stage, setStage] = useState(registration.stage || 0);
  const ref = useRef(null);

  // In the development environment, stages can be skipped by adding the 'stage' query parameter
  // to the URL.
  if (process.env.NODE_ENV === 'local') {
    const parsed = queryString.parse(location.search);

    if (parsed.stage) {
      setStage(+parsed.stage);
    }
  }

  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(users, auth.signedInUser)) {
      history.push('/dashboard');
    }
  }, [users]);

  return (
    <div className="sxctf-register" ref={ref}>
      <NavBar includeHeaders={['home', 'signIn', 'logo']} bodyRef={ref}/>
      <RegisterBody
        stage={stage}
        registration={registration}
      />
    </div>
  );
};

export default Register;