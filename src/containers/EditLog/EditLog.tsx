/**
 * Container component for the edit exercise log page.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React, {useEffect, useMemo, useState} from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import LogBody from "../../components/new-edit-log/LogBody";
import {getLog, invalidateLogUpdated, putLog} from "../../redux/modules/logs";
import NotFound from "../../components/shared/NotFound/NotFound";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user,
    logs: state.logs.items,
    updateLogs: state.logs.updateLogs
});

const mapDispatchToProps = {
    setUserFromStorage: setUserFromStorage,
    getLog: getLog,
    putLog: putLog,
    invalidateLogUpdated: invalidateLogUpdated,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const EditLog: React.FunctionComponent<Props> = ({
    auth = {},
    users = {},
    logs = {},
    updateLogs = {},
    setUserFromStorage,
    invalidateLogUpdated,
    getLog,
    putLog
}) => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();

    const { signedInUser } = auth;

    const [logValidated, setLogValidated] = useState(false);
    const [errorNotFound, setErrorNotFound] = useState(false);

    const logId = useMemo(() => {
        const urlPaths = routeMatch.url.split('/');
        return +urlPaths[urlPaths.length - 1];
    }, []);

    useEffect(() => {
        if (logId) {
            getLog(logId);
        } else {
            setErrorNotFound(true);
        }

        setLogValidated(true);
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!Object.keys(users).length && storedUser) {
            setUserFromStorage(storedUser);
        } else if (!userAuthenticated(users, auth.signedInUser)) {
            history.push('/');
        }
    }, [users]);

    const log = useMemo(() => {
        return logs[logId];
    }, [logs]);

    if (userAuthenticated(users, auth.signedInUser) && logValidated) {
        return (
            <div className={classes.editLog}>
                <NavBar includeHeaders={["profile", "groups", "admin", "signOut", "logo"]}/>
                {errorNotFound ?
                    <NotFound />
                    :
                    <LogBody
                        user={users[signedInUser]}
                        existingLog={log}
                        putLog={putLog}
                        updateLogs={updateLogs}
                        invalidateLogUpdated={invalidateLogUpdated}
                    />
                }
            </div>
        );
    } else {
        return null;
    }
};

export default connector(EditLog);
