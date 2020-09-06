/**
 * Container component for the create new exercise log page.
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
import LogBody from "../../components/new-edit-log/LogBody";
import {invalidateLogCreated, postLog} from "../../redux/modules/logs";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user,
    newLog: state.logs.newLog
});

const mapDispatchToProps = {
    postLog: postLog,
    setUserFromStorage: setUserFromStorage,
    invalidateLogCreated: invalidateLogCreated,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const NewLog: React.FunctionComponent<Props> = ({
    auth = {},
    users = {},
    newLog,
    postLog,
    setUserFromStorage,
    invalidateLogCreated
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
            <div className={classes.newLog}>
                <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
                <LogBody
                    postLog={postLog}
                    invalidateLogCreated={invalidateLogCreated}
                    user={users[signedInUser]}
                    newLog={newLog}
                />
            </div>
        );
    } else {
        return null;
    }
};

export default connector(NewLog);
