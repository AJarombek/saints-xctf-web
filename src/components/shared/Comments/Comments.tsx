/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React, {useEffect, useRef, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Comment, NewComments} from "../../../redux/types";
import classNames from "classnames";
import AlertPopup from "../AlertPopup/AlertPopup";

interface IProps {
    comments: Comment[];
    feel: number;
    onCreateComment: (content: string) => void;
    newComments: NewComments;
    logId: number;
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<IProps> = ({
    comments,
    feel,
    onCreateComment,
    newComments,
    logId
}) => {
    const classes = useStyles({ feel });

    const [content, setContent] = useState("");
    const [showError, setShowError] = useState(false);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (newComments) {
            const newComment = Object.entries(newComments).filter(([commentLogId, _]) => +commentLogId === logId);
            if (newComment.length && newComment[0][1].serverError) {
                setShowError(true);
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
                <div className={classes.addIcon} onClick={() => onCreateComment(content)}>
                  <p>&#x4c;</p>
                </div>
            )}
            {showError && (
                <AlertPopup
                    message="Unexpected Error Occurred Adding a Comment"
                    onClose={() => setShowError(false)}
                    type="error"
                />
            )}
        </div>
    );
};

export default Comments;
