/**
 * Component for an popup displaying an error.  This component is a wrapper around AlertPopup
 * for generic error messages.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import React, {ReactNode} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import AlertPopup from "../AlertPopup/AlertPopup";

interface IProps {
    message: string;
    onClose: () => void;
}

const useStyles = createUseStyles(styles);

const DefaultErrorPopup: React.FunctionComponent<IProps> = ({message, onClose}) => {
    const classes = useStyles();

    return (
        <AlertPopup
            message={
                <>
                    {message}.  Try reloading the page.  If this error persists,
                    contact <a className={classes.emailLink} href="mailto:andrew@jarombek.com">andrew@jarombek.com</a>.
                </>
            }
            onClose={onClose}
            type="error"
        />
    );
};

export default DefaultErrorPopup;
