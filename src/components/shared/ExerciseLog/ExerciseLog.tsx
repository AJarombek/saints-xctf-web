/**
 * ExerciseLog component which displays a published exercise log, often in a log feed.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Log, NewComments, User} from "../../../redux/types";
import {Link} from "react-router-dom";
import moment from "moment";
import Comments from "../Comments/Comments";
import {shortenTime} from "../../../utils/logs";

interface IProps {
    log: Log;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    addComment: (logId: number, content: string, username: string, first: string, last: string,
                 filterBy: string, bucket: string, page: number, index: number) => void;
    newComments: NewComments;
    user: User;
    page: number;
    filterBy: string;
    bucket: string;
    index: number;
}

const useStyles = createUseStyles(styles);

const ExerciseLog: React.FunctionComponent<IProps> = ({
    log,
    postComment,
    addComment,
    newComments,
    user,
    page,
    filterBy,
    bucket,
    index
}) => {
    const classes = useStyles({ feel: log?.feel });

    return (
        <div className={classes.exerciseLog}>
            <div className={classes.headerSection}>
                <div className={classes.titles}>
                    <Link to="/user" className={classes.titleLink}>{log.first} {log.last}</Link>
                    <h6 className={classes.title}>{log.name}</h6>
                </div>
                <div className={classes.metadata}>
                    <p className={classes.date}>{moment(log.date).format('MMM. Do, YYYY')}</p>
                    <p className={classes.type}>{log.type.toUpperCase()}</p>
                </div>
            </div>
            <div className={classes.bodySection}>
                <div className={classes.dataFields}>
                    {!!log.location && <p>Location: {log.location}</p>}
                    {!!log.distance && <p>{log.distance} {log.metric}</p>}
                    {!!log.time && log.time !== "0:00:00" && (
                        <p>{shortenTime(log.time)} ({shortenTime(log.pace)}/mi)</p>
                    )}
                </div>
                <div className={classes.description}>
                    <p>{log.description}</p>
                </div>
            </div>
            <div className={classes.commentSection}>
                <Comments
                    comments={log.comments}
                    feel={log.feel}
                    postComment={postComment}
                    addComment={addComment}
                    newComments={newComments}
                    logId={log.log_id}
                    user={user}
                    page={page}
                    filterBy={filterBy}
                    bucket={bucket}
                    index={index}
                />
            </div>
        </div>
    );
};

export default ExerciseLog;
