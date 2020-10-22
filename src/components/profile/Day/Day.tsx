/**
 * Component for a day in the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import moment from "moment";

interface IProps {
    date: moment.Moment;
}

const useStyles = createUseStyles(styles);

const Day: React.FunctionComponent<IProps> = ({ date }) => {
    const classes = useStyles();

    return (
        <div className={classes.day}></div>
    );
};

export default Day;
