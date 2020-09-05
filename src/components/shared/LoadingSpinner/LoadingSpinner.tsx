/**
 * Component for a spinner that indicates data is loading or a request is pending.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";
import {ClassValue} from "classnames/types";

interface IProps {
    className?: ClassValue
}

const useStyles = createUseStyles(styles);

const LoadingSpinner: React.FunctionComponent<IProps> = ({ className }) => {
    const classes = useStyles();

    return (
        <div className={classNames(classes.spinner, className)}> </div>
    );
};

export default LoadingSpinner;
