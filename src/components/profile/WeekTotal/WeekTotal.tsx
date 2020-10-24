/**
 * Component for a day in the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {RangeViewItem} from "../../../redux/types";

interface IProps {
    rangeViewItems?: RangeViewItem[];
}

const useStyles = createUseStyles(styles);

const WeekTotal: React.FunctionComponent<IProps> = ({ rangeViewItems = [] }) => {
    const classes = useStyles();

    return (
        <div className={classes.weekTotal}>
            <div className={classes.miles}>
                <p>{rangeViewItems.reduce((acc, item) => acc + item.miles, 0).toFixed(2)}</p>
                <p>Miles</p>
            </div>
        </div>
    );
};

export default WeekTotal;
