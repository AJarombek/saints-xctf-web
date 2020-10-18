/**
 * Component for on the profile and group pages which lists all the viewable tabs.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const PageTabs: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.tabs}>
            <div>
                <p onClick={() => {}}>Exercise Logs</p>
                <p onClick={() => {}}>Monthly Calendar</p>
                <p onClick={() => {}}>Weekly Chart</p>
                <p onClick={() => {}}>Details</p>
                <p onClick={() => {}}>Edit Profile</p>
            </div>
        </div>
    );
};

export default PageTabs;
