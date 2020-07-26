/**
 * DashboardFeed component which shows a log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React, {useMemo} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import {Log, LogFeeds} from "../../../redux/types";
import ExerciseLog from "../../shared/ExerciseLog/ExerciseLog";

interface IProps {
    logFeeds: LogFeeds;
    page: number;
}

const useStyles = createUseStyles(styles);

const DashboardFeed: React.FunctionComponent<IProps> = ({ logFeeds, page }) => {
    const classes = useStyles();

    const logs: Log[] = useMemo(() => {
        return logFeeds["all-all"]?.pages[page]?.items ?? []
    }, [logFeeds, page]);

    return (
        <div className={classes.dashboardFeed}>
            { logs.map((log) => (
                <ExerciseLog log={log} />
            ))}
        </div>
    );
};

export default DashboardFeed;
