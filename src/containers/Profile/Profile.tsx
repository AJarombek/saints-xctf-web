/**
 * Container component for a users profile page.
 * @author Andrew Jarombek
 * @since 8/15/2020
 */

import React, {useEffect, useMemo, useRef} from 'react';
import {RootState} from "../../redux/types";
import {connect, ConnectedProps} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";
import {userAuthenticated} from "../../utils/auth";
import {setUserFromStorage, signOut} from "../../redux/modules/auth";
import {createUseStyles} from "react-jss";
import styles from "./styles";
import NavBar from '../../components/shared/NavBar';
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";
import ProfileBody from "../../components/profile/ProfileBody/ProfileBody";
import {addComment, deleteLog, logFeed, postComment} from "../../redux/modules/logs";
import {getUser, getUserFlair, setUser} from "../../redux/modules/profile";
import {getGroupMemberships} from "../../redux/modules/memberships";
import {getRangeView} from "../../redux/modules/rangeView";

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.auth,
    authUsers: state.auth.user,
    logFeeds: state.logs.feeds,
    newComments: state.logs.newComments,
    deletedLogs: state.logs.deletedLogs,
    users: state.profile.users,
    groupMembershipInfo: state.memberships.groups,
    rangeViews: state.rangeView
});

const mapDispatchToProps = {
    getUser: getUser,
    setUser: setUser,
    setUserFromStorage: setUserFromStorage,
    getLogFeed: logFeed,
    postComment: postComment,
    addComment: addComment,
    deleteLog: deleteLog,
    signOut: signOut,
    getUserFlair: getUserFlair,
    getGroupMemberships: getGroupMemberships,
    getRangeView: getRangeView
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {}

const useStyles = createUseStyles(styles);

const Profile: React.FunctionComponent<Props> = ({
    auth = {},
    authUsers = {},
    logFeeds = {},
    users = {},
    groupMembershipInfo = {},
    rangeViews = {},
    getUser,
    setUser,
    setUserFromStorage,
    getLogFeed,
    postComment,
    addComment,
    deleteLog,
    newComments,
    deletedLogs,
    signOut,
    getUserFlair,
    getGroupMemberships,
    getRangeView
}) => {
    const routeMatch = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();

    const ref = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!Object.keys(authUsers).length && storedUser) {
            setUserFromStorage(storedUser);
        } else if (!userAuthenticated(authUsers, auth.signedInUser) && !storedUser) {
            history.push('/');
        }
    }, [authUsers]);

    useEffect(() => {
        if (auth.signedInUser && !users[username]?.user?.username) {
            if (auth.signedInUser === username && authUsers[username]) {
                setUser(authUsers[username]?.user);
            } else {
                getUser(username);
            }
        }
    }, [auth.signedInUser, users]);

    const username = useMemo(() => {
        const urlPaths = routeMatch.url.split('/');
        return urlPaths[urlPaths.length - 1];
    }, [routeMatch.url]);

    if (userAuthenticated(users, auth.signedInUser)) {
        return (
            <div className={classes.profile} ref={ref}>
                <NavBar
                    includeHeaders={["groups", "admin", "signOut", "logo"]}
                    signOut={signOut}
                    user={users[username]?.user}
                    bodyRef={ref}
                />
                <ProfileBody
                    user={users[username]?.user}
                    flair={users[username]?.flair}
                    groupMemberships={groupMembershipInfo.items}
                    getLogFeed={getLogFeed}
                    logFeeds={logFeeds}
                    postComment={postComment}
                    addComment={addComment}
                    deleteLog={deleteLog}
                    getUserFlair={getUserFlair}
                    getGroupMemberships={getGroupMemberships}
                    newComments={newComments}
                    deletedLogs={deletedLogs}
                    getRangeView={getRangeView}
                    rangeViews={rangeViews.users[username]}
                />
                <HomeFooter showContactUs={false} />
            </div>
        );
    } else {
        return null;
    }
};

export default connector(Profile);
