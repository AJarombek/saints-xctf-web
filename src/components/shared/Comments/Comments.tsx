/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React, {useEffect, useRef, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Comment, NewComments, User} from "../../../redux/types";
import classNames from "classnames";
import AlertPopup from "../AlertPopup/AlertPopup";
import {Link} from "react-router-dom";
import moment from "moment";

interface IProps {
    comments: Comment[];
    feel: number;
    onCreateComment: (content: string, user: User) => void;
    newComments: NewComments;
    logId: number;
    user: User;
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<IProps> = ({
    comments,
    feel,
    onCreateComment,
    newComments,
    logId,
    user
}) => {
    const classes = useStyles({ feel });

    const [content, setContent] = useState("");
    const [showError, setShowError] = useState(false);
    const [prevErrorTime, setPrevErrorTime] = useState(0);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (newComments) {
            const newComment = Object.entries(newComments).filter(([commentLogId, _]) => +commentLogId === logId);

            if (newComment.length && newComment[0][1].serverError && newComment[0][1].lastUpdated !== prevErrorTime) {
                setShowError(true);
                setPrevErrorTime(newComment[0][1].lastUpdated);
            }
        }
    }, [newComments]);

    const onTextAreaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "25px";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 4}px`;
    };

    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className={classes.comments}>
            <div className={classes.newCommentForm}>
                <textarea
                    className={
                        classNames(classes.newComment, content ? classes.focusNewComment : classes.blurNewComment)
                    }
                    maxLength={1000}
                    placeholder="Comment"
                    ref={textAreaRef}
                    onChange={onTextAreaChange}
                    onKeyUp={onTextAreaKeyUp}
                />
                {!!content && (
                    <div className={classes.addIcon} onClick={() => onCreateComment(content, user)}>
                        <p>&#x4c;</p>
                    </div>
                )}
            </div>
            {comments && (
                <div className={classes.commentList}>
                    {comments.map((comment) => (
                        <div className={classes.comment}>
                            <div className={classes.commentHeader}>
                                <Link to={`/user/${comment.username}`} className={classes.titleLink}>
                                    {comment.first} {comment.last}
                                </Link>
                                <p className={classes.date}>
                                    {moment(comment.time).format('MMM. Do, YYYY h:mm:ss A')}
                                </p>
                            </div>
                            <div className={classes.commentBody}>
                                <p className={classes.content}>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showError && (
                <AlertPopup
                    message="An unexpected error occurred while adding a comment."
                    onClose={() => setShowError(false)}
                    type="error"
                />
            )}
        </div>
    );
};

export default Comments;
