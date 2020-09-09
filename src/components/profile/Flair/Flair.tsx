/**
 * Component for on the profile page which shows the flair given to the user.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const Flair: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.flair}></div>
    );
};

export default Flair;
