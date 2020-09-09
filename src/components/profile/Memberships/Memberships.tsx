/**
 * Component for on the profile page which lists the users group and team memberships
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const Memberships: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.memberships}></div>
    );
};

export default Memberships;
