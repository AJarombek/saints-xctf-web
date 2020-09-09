/**
 * Component for on the profile and group pages which displays a picture (profile picture, group picture) and the
 * title of the page (user's first and last name, group name).
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {}

const useStyles = createUseStyles(styles);

const PictureTitle: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}></div>
    );
};

export default PictureTitle;
