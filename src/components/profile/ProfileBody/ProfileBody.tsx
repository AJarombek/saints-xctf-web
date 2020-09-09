/**
 * Component for the body of the user profile page.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import PictureTitle from "../../shared/PictureTitle/PictureTitle";
import Flair from "../Flair/Flair";
import Memberships from "../Memberships/Memberships";
import PageTabs from "../../shared/PageTabs/PageTabs";

interface IProps {}

enum Tabs {
    LOGS, CALENDAR, CHART, DETAILS, EDIT
}

const useStyles = createUseStyles(styles);

const ProfileBody: React.FunctionComponent<IProps> = () => {
    const classes = useStyles();

    const [tab, setTab] = useState();

    return (
        <div className={classes.container}>
            <aside>
                <PictureTitle />
                <Flair />
                <Memberships />
                <PageTabs />
            </aside>
            <section>

            </section>
        </div>
    );
};

export default ProfileBody;
