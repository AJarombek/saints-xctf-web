/**
 * Component for a tab on the profile page which shows a details about a user's profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const ProfileDetails: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.profileDetails}></div>
    );
};

export default ProfileDetails;
