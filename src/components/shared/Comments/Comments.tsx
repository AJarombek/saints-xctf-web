/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Comment} from "../../../redux/types";

interface IProps {
    comments: Comment[];
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<IProps> = ({ comments }) => {
    const classes = useStyles();

    return (
        <div className={classes.comments}>

        </div>
    );
};

export default Comments;
