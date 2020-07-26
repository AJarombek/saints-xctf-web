/**
 * ExerciseLog component which displays a published exercise log, often in a log feed.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import React, {useMemo} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Log} from "../../../redux/types";

interface IProps {
    log: Log;
}

const useStyles = createUseStyles(styles);

const ExerciseLog: React.FunctionComponent<IProps> = ({ log }) => {
    const classes = useStyles();

    return (
        <div className={classes.exerciseLog}>
            {JSON.stringify(log)}
        </div>
    );
};

export default ExerciseLog;
