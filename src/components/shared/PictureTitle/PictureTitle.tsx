/**
 * Component for on the profile and group pages which displays a picture (profile picture, group picture) and the
 * title of the page (user's first and last name, group name).
 * You are always very loved.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {
    imageUrl: string;
    title: string;
    subTitle: string;
}

const useStyles = createUseStyles(styles);

const PictureTitle: React.FunctionComponent<IProps> = ({ imageUrl, title, subTitle }) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <figure>
                <img src={imageUrl} alt=""/>
            </figure>
            <div>
                <h5>{title}</h5>
            </div>
            <div>{subTitle}</div>
        </div>
    );
};

export default PictureTitle;
