/**
 * Component for an accordion that displays additional content when opened.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface IProps {
    iconNode: React.ReactNode;
    title: React.ReactNode;
    children?: React.ReactNode;
    expandable?: boolean;
}

const useStyles = createUseStyles(styles);

const Accordion: React.FunctionComponent<IProps> = ({ iconNode, title, children, expandable = true }) => {
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        if (expandable) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={classes.accordion}>
            <div className={classes.header} onClick={onOpen}>
                <p className={classes.icon}>{iconNode}</p>
                <div className={classes.title}>{title}</div>
                <p className={classes.arrow}>{expandable ? isOpen ? "\u0042" : "\u0043" : "\u0045"}</p>
            </div>
            {isOpen && expandable && (
                <div className={classes.body}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
