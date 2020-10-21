/**
 * Component for a calendar that displays exercises.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Month from "../Month";

interface IProps {}

const useStyles = createUseStyles(styles);

const Calendar: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.calendar}>
            <Month />
        </div>
    );
};

export default Calendar;
