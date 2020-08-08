/**
 * Container component for the sign in page.
 * @author Andrew Jarombek
 * @since 4/30/2020
 */

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import { signIn } from '../../redux/modules/auth';
import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import SignInBody from '../../components/sign-in/SignInBody';
import {RootState} from "../../redux/types";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.auth,
  user: state.auth.user
});

const mapDispatchToProps = {
  signInUser: signIn
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const SignIn: React.FunctionComponent<Props> = ({ auth = {}, user = {}, signInUser }) => {
  const { isFetching = false, signedIn, status } = auth;
  const history = useHistory();

  useEffect(() => {
    if (userAuthenticated(user, signedIn)) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className="sxctf-sign-in">
      <NavBar includeHeaders={["home", "register", "logo"]}/>
      <SignInBody signIn={signInUser} isFetching={isFetching} status={status}/>
    </div>
  );
};

export default connector(SignIn);
