/**
 * DashboardSidePanel component which shows links to other parts of the website.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Accordion from "../../shared/Accordion/Accordion";

interface IProps {

}

const useStyles = createUseStyles(styles);

const DashboardSidePanel: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.dashboardSidePanel}>
            <Accordion iconNode={<p>&#xe107;</p>} title="Profile" expandable={false} />
            <Accordion iconNode={<p>&#x0050;</p>} title="Create New Log" expandable={false} />
            <Accordion iconNode={<p>&#xe026;</p>} title="Groups">
                <div>Groups</div>
            </Accordion>
            <Accordion iconNode={<p>&#x0057;</p>} title="Notifications">
                <div>Notifications</div>
            </Accordion>
        </div>
    );
};

export default DashboardSidePanel;
