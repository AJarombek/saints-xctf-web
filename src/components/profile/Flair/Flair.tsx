/**
 * Component for on the profile page which shows the flair given to the user.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {FlairMeta} from "../../../redux/types";

interface IProps {
    flair?: FlairMeta;
}

const useStyles = createUseStyles(styles);

const Flair: React.FunctionComponent<IProps> = ({ flair = {} }) => {
    const classes = useStyles();

    return (
        <div className={classes.flair}>
            {flair.items?.map((item) => (<p>{item.flair}</p>))}
        </div>
    );
};

export default Flair;
