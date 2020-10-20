/**
 * Container component for the create new exercise log page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, {useEffect, useRef} from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage, signOut} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import LogBody from "../../components/new-edit-log/LogBody";
import {invalidateLogCreated, postLog} from "../../redux/modules/logs";
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user,
    newLog: state.logs.newLog
});

const mapDispatchToProps = {
    postLog: postLog,
    setUserFromStorage: setUserFromStorage,
    invalidateLogCreated: invalidateLogCreated,
    signOut: signOut
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
    invalidateLogCreated,
    signOut
}) => {
    const history = useHistory();
    const classes = useStyles();

    const ref = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!Object.keys(users).length && storedUser) {
            setUserFromStorage(storedUser);
        } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
            history.push('/');
        }
    }, [users]);

    if (userAuthenticated(users, auth.signedInUser)) {
        return (
            <div className={classes.newLog} ref={ref}>
                <NavBar
                    includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}
                    signOut={signOut}
                    user={users[auth.signedInUser]?.user}
                    bodyRef={ref}
                />
                <LogBody
                    postLog={postLog}
                    invalidateLogCreated={invalidateLogCreated}
                    user={users[auth.signedInUser]?.user}
                    newLog={newLog}
                />
                <HomeFooter showContactUs={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default connector(NewLog);
