/**
 * DashboardSidePanel component which shows links to other parts of the website.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import Accordion from "../../shared/Accordion/Accordion";
import {useHistory} from "react-router-dom";
import {User, GroupMember} from "../../../redux/types";

interface IProps {
    user: User;
    groupMemberships: GroupMember[];
}

const useStyles = createUseStyles(styles);

const DashboardSidePanel: React.FunctionComponent<IProps> = ({ user, groupMemberships }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.dashboardSidePanel}>
            <Accordion
                iconNode={<p>&#xe107;</p>}
                title="Profile"
                expandable={false}
                onClick={() => history.push(`/profile/${user.username}`)}
            />
            <Accordion
                iconNode={<p>&#x0050;</p>}
                title="Create New Log"
                expandable={false}
                onClick={() => history.push('/newLog')}
            />
            <Accordion iconNode={<p>&#xe026;</p>} title="Groups" expandable={true}>
                <div>Groups</div>
            </Accordion>
            <Accordion iconNode={<p>&#x0057;</p>} title="Notifications" expandable={true}>
                <div>Notifications</div>
            </Accordion>
        </div>
    );
};

export default DashboardSidePanel;
