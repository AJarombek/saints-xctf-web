/**
 * Component for a month on the calendar.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Week from "../Week";

interface IProps {}

const useStyles = createUseStyles(styles);

const Month: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.month}>
            {}
            <Week />
        </div>
    );
};

export default Month;
