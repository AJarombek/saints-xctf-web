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
    miles: number;
}

const useStyles = createUseStyles(styles);

const WeekTotal: React.FunctionComponent<IProps> = ({ miles }) => {
    const classes = useStyles();

    return (
        <div className={classes.weekTotal}>
            <div className={classes.miles}>
                <p>{miles}</p>
                <p>Miles</p>
            </div>
        </div>
    );
};

export default WeekTotal;
