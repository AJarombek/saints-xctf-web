/**
 * Component for the new log page which allows users to create a new exercise log.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {

}

const useStyles = createUseStyles(styles);

const NewLogBody: React.FunctionComponent<IProps> = ({ }) => {
    const classes = useStyles();

    return (
        <div className={classes.newLogBody}>
            <h3>Create a new exercise log.</h3>
        </div>
    );
};

export default NewLogBody;
