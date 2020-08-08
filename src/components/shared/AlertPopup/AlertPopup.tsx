/**
 * Component for an Alert that pops up with warnings or errors.
 * @author Andrew Jarombek
 * 8/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {
    message: string,
}

const useStyles = createUseStyles(styles);

const AlertPopup: React.FunctionComponent<IProps> = ({message}) => {
    const classes = useStyles();

    return (
        <div className={classes.alert}>
            <p>&#xe063;</p>
            <p>{message}</p>
        </div>
    );
};

export default AlertPopup;
