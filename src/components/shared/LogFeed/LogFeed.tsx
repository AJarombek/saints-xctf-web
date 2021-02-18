/**
 * LogFeed component which shows a log feed.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Log, LogFeeds, User } from '../../../redux/types';
import ExerciseLog from '../../shared/ExerciseLog/ExerciseLog';
import { AJLoadingDots } from 'jarombek-react-components';

interface Props {
  logFeeds: LogFeeds;
  page: number;
  user: User;
  filterBy: string;
  bucket: string;
}

const useStyles = createUseStyles(styles);

const LogFeed: React.FunctionComponent<Props> = ({ logFeeds, page, user, filterBy, bucket }) => {
  const classes = useStyles();

  const logs: Log[] = useMemo(() => {
    return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.items ?? [];
  }, [logFeeds, page, bucket, filterBy]);

  const loading: boolean = useMemo(() => {
    return logFeeds[`${filterBy}-${bucket}`]?.pages[page]?.isFetching ?? true;
  }, [logFeeds, page, bucket, filterBy]);

  return (
    <div id="logFeed" className={classes.logFeed}>
      {logs.map((log, index) => (
        <React.Fragment key={log.log_id}>
          <ExerciseLog
            log={log}
            user={user}
            inFeed={true}
            page={page}
            filterBy={filterBy}
            bucket={bucket}
            index={index}
          />
        </React.Fragment>
      ))}
      {loading && (
        <div className={classes.loading}>
          <AJLoadingDots />
        </div>
      )}
    </div>
  );
};

export default LogFeed;
