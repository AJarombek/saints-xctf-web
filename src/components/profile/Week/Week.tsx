/**
 * Component for a week on the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import moment from "moment";
import Day from "../Day";

interface IProps {
    start: moment.Moment;
    monthStart: moment.Moment;
}

const useStyles = createUseStyles(styles);

const Week: React.FunctionComponent<IProps> = ({ start, monthStart }) => {
    const classes = useStyles();

    return (
        <div className={classes.week}>
            {Array(7).fill(0).map((_, i) => (
                <Day date={start.add(i, 'days')} />
            ))}
        </div>
    );
};

export default Week;
