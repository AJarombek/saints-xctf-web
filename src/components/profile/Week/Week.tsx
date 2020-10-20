/**
 * Component for a week on the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const Week: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.week}></div>
    );
};

export default Week;
