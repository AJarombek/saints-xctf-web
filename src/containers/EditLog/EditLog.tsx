/**
 * Container component for the edit exercise log page.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React, {useEffect, useState} from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import LogBody from "../../components/new-edit-log/LogBody";
import {getLog} from "../../redux/modules/logs";
import NotFound from "../../components/shared/NotFound/NotFound";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user
});

const mapDispatchToProps = {
    setUserFromStorage: setUserFromStorage,
    getLog: getLog
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const EditLog: React.FunctionComponent<Props> = ({ auth = {}, users = {}, setUserFromStorage }) => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();

    const { signedInUser } = auth;

    const [errorNotFound, setErrorNotFound] = useState(false);

    useEffect(() => {
        const urlPaths = routeMatch.url.split('/');
        const logId = +urlPaths[urlPaths.length - 1];

        if (logId) {
            getLog(logId);
        } else {
            setErrorNotFound(true);
        }
    });

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
            <div className={classes.editLog}>
                <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
                {errorNotFound ?
                    <NotFound />
                    :
                    <LogBody
                        user={users[signedInUser]}
                        existingLog={null}
                    />
                }
            </div>
        );
    } else {
        return null;
    }
};

export default connector(EditLog);
