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
    monthStart: moment.Moment;
    monthEnd: moment.Moment;
    miles: number;
}

const useStyles = createUseStyles(styles);

const Day: React.FunctionComponent<IProps> = ({ date, monthStart, monthEnd, miles }) => {
    const classes = useStyles();

    return (
        <div className={classes.day}>
            <div>
                <p className={classes.dayOfMonth}>{date.date()}</p>
                <div>
                    <p>{miles}</p>
                    <p>Miles</p>
                </div>
            </div>
        </div>
    );
};

export default Day;
