/**
 * Component for a month on the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React, {useMemo} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Week from "../Week";
import {RangeViewItemsMeta} from "../../../redux/types";
import moment from "moment";

interface IProps {
    rangeView: RangeViewItemsMeta;
    start: moment.Moment;
    monthStart: moment.Moment;
    monthEnd: moment.Moment;
}

const useStyles = createUseStyles(styles);

const Month: React.FunctionComponent<IProps> = ({ rangeView, start, monthStart, monthEnd }) => {
    const classes = useStyles();

    const weeks = useMemo(() => {
        let startDate = start.clone();
        let endDate = start.clone().add(6, 'days');

        const weekList = [];
        for (let i = 0; i < 6; i++) {
            weekList.push([startDate.clone(), endDate.clone()])
            startDate.add(1, 'week');
            endDate.add(1, 'week');
        }

        return weekList;
    }, []);

    return (
        <div className={classes.month}>
            {weeks.map(([weekStart, _]) => (
                <Week start={weekStart} monthStart={monthStart} monthEnd={monthEnd} />
            ))}
        </div>
    );
};

export default Month;
