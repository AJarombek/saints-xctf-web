/**
 * Component for an Alert that pops up with warnings or errors.
 * @author Andrew Jarombek
 * 8/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

export type AlertPopupType = 'error' | 'warning' | 'info';

interface IProps {
    message: string;
    onClose: () => void;
    type: AlertPopupType;
}

const useStyles = createUseStyles(styles);

const AlertPopup: React.FunctionComponent<IProps> = ({message, onClose, type}) => {
    const classes = useStyles({ type });

    let alertIcon;
    switch (type) {
        case "error":
            alertIcon = "\ue062";
            break;
        case "info":
            alertIcon = "\ue063";
            break;
        case "warning":
            alertIcon = "\ue064";
            break;
        default:
            alertIcon = "\ue062";
    }

    return (
        <div className={classes.alertContainer}>
            <div className={classes.alert}>
                <p className={classes.alertIcon}>{alertIcon}</p>
                <p className={classes.message}>{message}</p>
                <p className={classes.closeIcon} onClick={onClose}>&#x4d;</p>
            </div>
        </div>
    );
};

export default AlertPopup;
