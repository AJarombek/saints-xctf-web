/**
 * Component for an accordion that displays additional content when opened.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {
    title: React.ReactNode;
    children: React.ReactNode;
}

const useStyles = createUseStyles(styles);

const Accordion: React.FunctionComponent<IProps> = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.accordion}>
            <div>{children}</div>
        </div>
    );
};

export default Accordion;
