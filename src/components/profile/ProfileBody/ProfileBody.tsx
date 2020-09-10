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
import {DeletedLogs, LogFeeds, NewComments} from "../../../redux/types";
import PaginationBar from "../../shared/PaginationBar/PaginationBar";
import LogFeed from "../../shared/LogFeed/LogFeed";

interface IProps {
    getLogFeed: (filterBy: string, bucket: string, limit: number, offset: number) => void;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    addComment: (logId: number, content: string, username: string, first: string, last: string,
                 filterBy: string, bucket: string, page: number, index: number) => void;
    deleteLog: (logId: number) => void;
    logFeeds: LogFeeds;
    newComments: NewComments;
    deletedLogs: DeletedLogs;
    username: string;
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
    logFeeds,
    newComments,
    deletedLogs,
    username
}) => {
    const classes = useStyles();

    const [tab, setTab] = useState(Tabs.LOGS);
    const [filterBy, setFilterBy] = useState('user');
    const [bucket, setBucket] = useState('all');
    const [page, setPage] = useState(1);

    useEffect(() => {
        getLogFeed(filterBy, bucket, 10, 10 * (page - 1));
    }, [filterBy, bucket, page]);

    useEffect(() => {
        setBucket(username);
    }, [username]);

    const totalPages: number = useMemo(() => {
        return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.pages ?? 0
    }, [logFeeds, page]);

    return (
        <div className={classes.container}>
            <aside>
                <PictureTitle />
                <Flair />
                <Memberships />
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
                            user={}
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
};

export default ProfileBody;
