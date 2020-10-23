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
import WeekTotal from "../WeekTotal";

interface IProps {
    start: moment.Moment;
    monthStart: moment.Moment;
    monthEnd: moment.Moment;
}

const useStyles = createUseStyles(styles);

const Week: React.FunctionComponent<IProps> = ({ start, monthStart, monthEnd }) => {
    const classes = useStyles();

    return (
        <div className={classes.week}>
            {Array(7).fill(0).map((_, i) => (
                <Day
                    date={start.clone().add(i, 'days')}
                    monthStart={monthStart}
                    monthEnd={monthEnd}
                    miles={null}
                />
            ))}
            <WeekTotal miles={0} />
        </div>
    );
};

export default Week;
