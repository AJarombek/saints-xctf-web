/**
 * Container component for a users profile page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, {useEffect, useMemo} from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";
import ProfileBody from "../../components/profile/ProfileBody/ProfileBody";
import {addComment, deleteLog, logFeed, postComment} from "../../redux/modules/logs";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    users: state.auth.user,
    logFeeds: state.logs.feeds,
    newComments: state.logs.newComments,
    deletedLogs: state.logs.deletedLogs
});

const mapDispatchToProps = {
    setUserFromStorage: setUserFromStorage,
    getLogFeed: logFeed,
    postComment: postComment,
    addComment: addComment,
    deleteLog: deleteLog,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Profile: React.FunctionComponent<Props> = ({
    auth = {},
    users = {},
    logFeeds = {},
    setUserFromStorage,
    getLogFeed,
    postComment,
    addComment,
    deleteLog,
    newComments,
    deletedLogs
}) => {
    const routeMatch = useRouteMatch();
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

    const username = useMemo(() => {
        const urlPaths = routeMatch.url.split('/');
        return urlPaths[urlPaths.length - 1];
    }, []);

    if (userAuthenticated(users, auth.signedInUser)) {
        return (
            <div className={classes.profile}>
                <NavBar includeHeaders={["groups", "admin", "signOut", "logo"]}/>
                <ProfileBody
                    username={username}
                    getLogFeed={getLogFeed}
                    logFeeds={logFeeds}
                    postComment={postComment}
                    addComment={addComment}
                    deleteLog={deleteLog}
                    newComments={newComments}
                    deletedLogs={deletedLogs}
                />
                <HomeFooter showContactUs={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default connector(Profile);
