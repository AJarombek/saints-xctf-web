/**
 * Component for the body of the user profile page.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {

}

const useStyles = createUseStyles(styles);

const ProfileBody: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}> </div>
    );
};

export default ProfileBody;
