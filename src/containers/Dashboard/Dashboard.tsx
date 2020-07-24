/**
 * Dashboard component displayed when a user is signed in.  Shows an overview of user activity.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAuthenticated } from '../../utils/auth';
import NavBar from '../../components/shared/NavBar';
import {Users} from "../../utils/types";

interface RootState {
  auth: {
    auth: Auth,
    user: Users
  }
}

interface Auth {
  isFetching?: boolean,
  signedIn?: boolean,
  status?: string
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.auth,
  user: state.auth.user
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const Dashboard: React.FunctionComponent<Props> = ({ auth = {}, user = {} }) => {
  const { signedIn } = auth;
  const history = useHistory();

  useEffect(() => {
    if (!userAuthenticated(user, signedIn)) {
      history.push('/');
    }
  }, [user]);

  return (
    <div className="sxctf-dashboard">
      <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
    </div>
  );
};

export default connector(Dashboard);
