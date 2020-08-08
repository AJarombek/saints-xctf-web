/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React, {useRef, useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Comment} from "../../../redux/types";
import classNames from "classnames";

interface IProps {
    comments: Comment[];
    feel: number;
    onCreateComment: (content: string) => void;
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<IProps> = ({ comments, feel, onCreateComment }) => {
    const classes = useStyles({ feel });

    const [content, setContent] = useState("");

    const textAreaRef = useRef(null);

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
        </div>
    );
};

export default Comments;
