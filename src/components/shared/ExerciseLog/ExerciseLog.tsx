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

interface IProps {
    log: Log;
    postComment: (logId: number, username: string, first: string, last: string, content: string) => void;
    newComments: NewComments;
    user: User;
}

const useStyles = createUseStyles(styles);

const ExerciseLog: React.FunctionComponent<IProps> = ({ log, postComment, newComments, user }) => {
    const classes = useStyles({ feel: log?.feel });

    const onCreateComment = (content: string, user: User) => {
        if (content) {
            postComment(log.log_id, user.username, user.first, user.last, content);
        }
    };

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
                    <p>Location: {log.location}</p>
                    <p>{log.distance} {log.metric}</p>
                    <p>{log.time} ({log.pace}/mi)</p>
                </div>
                <div className={classes.description}>
                    <p>{log.description}</p>
                </div>
            </div>
            <div className={classes.commentSection}>
                <Comments
                    comments={log.comments}
                    feel={log.feel}
                    onCreateComment={onCreateComment}
                    newComments={newComments}
                    logId={log.log_id}
                    user={user}
                />
            </div>
        </div>
    );
};

export default ExerciseLog;
