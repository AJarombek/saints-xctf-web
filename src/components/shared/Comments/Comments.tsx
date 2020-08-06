/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React, {useRef} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Comment} from "../../../redux/types";

interface IProps {
    comments: Comment[];
    feel: number;
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<IProps> = ({ comments, feel }) => {
    const classes = useStyles({ feel });

    const textAreaRef = useRef(null);

    const onTextAreaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "25px";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 4}px`;
    };

    return (
        <div className={classes.comments}>
            <textarea
                className={classes.newComment}
                maxLength={1000}
                placeholder="Comment"
                ref={textAreaRef}
                onKeyUp={onTextAreaKeyUp}
            />
            <div className={classes.addIcon}>
                <p>+</p>
            </div>
        </div>
    );
};

export default Comments;
