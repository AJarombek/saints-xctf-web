/**
 * Component for the body of the user profile page.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import React, {useEffect, useMemo, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import PictureTitle from "../../shared/PictureTitle/PictureTitle";
import Flair from "../Flair/Flair";
import Memberships from "../Memberships/Memberships";
import PageTabs from "../../shared/PageTabs/PageTabs";
import {DeletedLogs, FlairMeta, GroupMember, LogFeeds, NewComments, UserMeta} from "../../../redux/types";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import LogFeed from "../../shared/LogFeed/LogFeed";

interface IProps {
    getLogFeed: (filterBy: string, bucket: string, limit: number, offset: number) => void;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    addComment: (logId: number, content: string, username: string, first: string, last: string,
                 filterBy: string, bucket: string, page: number, index: number) => void;
    deleteLog: (logId: number) => void;
    getGroupMemberships: (username: string) => void;
    getUserFlair: (username: string) => void;
    logFeeds: LogFeeds;
    newComments: NewComments;
    deletedLogs: DeletedLogs;
    user: UserMeta;
    flair: FlairMeta;
    groupMemberships: GroupMember[];
}

enum Tabs {
    LOGS, CALENDAR, CHART, DETAILS, EDIT
}

const useStyles = createUseStyles(styles);

const ProfileBody: React.FunctionComponent<IProps> = ({
    getLogFeed,
    postComment,
    addComment,
    deleteLog,
    getGroupMemberships,
    getUserFlair,
    logFeeds,
    newComments,
    deletedLogs,
    user,
    flair,
    groupMemberships
}) => {
    const classes = useStyles();

    const [tab, setTab] = useState(Tabs.LOGS);
    const [filterBy, setFilterBy] = useState('user');
    const [bucket, setBucket] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (bucket) {
            getLogFeed(filterBy, bucket, 10, 10 * (page - 1));
        }
    }, [filterBy, bucket, page]);

    useEffect(() => {
        if (user) {
            if (user.username !== bucket) {
                setBucket(user.username);
            }

            if (!groupMemberships) {
                getGroupMemberships(user.username);
            }

            if (!flair) {
                getUserFlair(user.username);
            }
        }
    }, [user, groupMemberships, flair]);

    const totalPages: number = useMemo(() => {
        return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.pages ?? 0
    }, [logFeeds, page]);

    if (user) {
        return (
            <div className={classes.container}>
                <aside>
                    <PictureTitle
                        imageUrl={`${user?.username}`}
                        title={`${user?.first} ${user?.last}`}
                        subTitle={`@${user?.username}`}
                    />
                    <Flair flair={flair} />
                    <Memberships groupMemberships={groupMemberships} />
                    <PageTabs />
                </aside>
                <section>
                    {tab === Tabs.LOGS && (
                        <>
                            <LogFeed
                                logFeeds={logFeeds}
                                page={page}
                                getLogFeed={getLogFeed}
                                postComment={postComment}
                                addComment={addComment}
                                deleteLog={deleteLog}
                                newComments={newComments}
                                deletedLogs={deletedLogs}
                                user={user}
                                filterBy={filterBy}
                                bucket={bucket}
                            />
                            <PaginationBar
                                page={page}
                                totalPages={totalPages}
                                onChangePage={(page) => {
                                    setPage(page);
                                    window.scrollTo(0, 0);
                                }}
                            />
                        </>
                    )}
                </section>
            </div>
        );
    } else {
        return null;
    }
};

export default ProfileBody;
