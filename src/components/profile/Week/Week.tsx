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
import {RangeViewItem} from "../../../redux/types";

interface IProps {
    start: moment.Moment;
    monthStart: moment.Moment;
    monthEnd: moment.Moment;
    rangeViewItems: RangeViewItem[]
}

const useStyles = createUseStyles(styles);

const Week: React.FunctionComponent<IProps> = ({ start, monthStart, monthEnd, rangeViewItems }) => {
    const classes = useStyles();

    const items = [...rangeViewItems];

    return (
        <div className={classes.week}>
            {Array(7).fill(0).map((_, i) => {
                const date = start.clone().add(i, 'days');
                const item = items.length && items[0].date === date.format('YYYY-MM-DD') ? items.shift() : null;
                return (
                    <Day
                        date={date}
                        monthStart={monthStart}
                        monthEnd={monthEnd}
                        miles={item?.miles}
                        feel={item?.feel}
                    />
                );
            })}
            <WeekTotal rangeViewItems={rangeViewItems} />
        </div>
    );
};

export default Week;
