/**
 * Container component for a users profile page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, { useEffect } from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";
import ProfileBody from "../../components/profile/ProfileBody/ProfileBody";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user
});

const mapDispatchToProps = {
    setUserFromStorage: setUserFromStorage
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Profile: React.FunctionComponent<Props> = ({
    auth = {},
    users = {},
    setUserFromStorage
}) => {
    const history = useHistory();
    const classes = useStyles();

    const { signedInUser } = auth;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!Object.keys(users).length && storedUser) {
            setUserFromStorage(storedUser);
        } else if (!userAuthenticated(users, auth.signedInUser)) {
            history.push('/');
        }
    }, [users]);

    if (userAuthenticated(users, auth.signedInUser)) {
        return (
            <div className={classes.profile}>
                <NavBar includeHeaders={["groups", "admin", "signOut", "logo"]}/>
                <ProfileBody />
                <HomeFooter showContactUs={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default connector(Profile);
