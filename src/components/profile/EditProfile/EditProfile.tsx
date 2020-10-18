/**
 * Component for a tab on the profile page which allows users to edit their profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const EditProfile: React.FunctionComponent<IProps> = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.editProfile}></div>
    );
};

export default EditProfile;
