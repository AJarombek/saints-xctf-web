/**
 * ExerciseLog component which displays a published exercise log, often in a log feed.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { DeletedLog, DeletedLogs, Log, RootState, User } from '../../../redux/types';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Comments from '../Comments/Comments';
import { parseTagsInText, shortenTime } from '../../../utils/logs';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLog, logFeed } from '../../../redux/modules/logs';
import DeleteLogModal from './DeleteLogModal';
import DefaultErrorPopup from '../DefaultErrorPopup';

export const feelClassList = [
  'terrible',
  'veryBad',
  'bad',
  'prettyBad',
  'mediocre',
  'average',
  'fairlyGood',
  'good',
  'great',
  'fantastic',
];

interface Props {
  log: Log;
  user: User;
  inFeed: boolean;
  page?: number;
  filterBy?: string;
  bucket?: string;
  index?: number;
  linkProfile?: boolean;
}

const useStyles = createUseStyles(styles);

const ExerciseLog: React.FunctionComponent<Props> = ({
  log,
  user,
  inFeed,
  page,
  filterBy,
  bucket,
  index,
  linkProfile = true,
}) => {
  const navigate = useNavigate();
  const classes = useStyles({ feel: log?.feel });

  const dispatch = useDispatch();
  const deletedLogs: DeletedLogs = useSelector((state: RootState) => state.logs.deletedLogs);

  const [isUsersLog, setIsUsersLog] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [optionsOpened, setOptionsOpened] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(false);

  useEffect(() => {
    if (user && log) {
      setIsUsersLog(user.username === log.username);
    }
  }, [user, log]);

  useEffect(() => {
    const deletedInfo = deletedLogs[log.log_id] ?? ({} as DeletedLog);
    if (deletedInfo.deleted && !deletedInfo.didInvalidate) {
      if (inFeed) {
        dispatch(logFeed(filterBy, bucket, 10, 10 * (page - 1)));
        setIsDeleting(false);
        setShowDeleteModal(false);
      } else {
        navigate('/');
      }
    }

    if (!deletedInfo.deleted && deletedInfo.serverError && !deletedInfo.didInvalidate) {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setErrorDeleting(true);
    }
  }, [deletedLogs, log, bucket, filterBy, page, dispatch, inFeed, navigate]);

  const onDeleteLog = (): void => {
    setIsDeleting(true);
    dispatch(deleteLog(log.log_id));
  };

  return (
    <div
      className={classNames(classes.exerciseLog, 'exerciseLog', feelClassList[(log?.feel ?? 6) - 1])}
      onMouseOver={(): void => setHovering(true)}
      onMouseLeave={(): void => {
        setHovering(false);
        setOptionsOpened(false);
      }}
    >
      <div className={classes.headerSection}>
        <div className={classes.titles}>
          {linkProfile ? (
            <Link to={`/profile/${log?.username}`} className={classes.titleLink} data-cypress="exerciseLogUser">
              {log.first} {log.last}
            </Link>
          ) : (
            <h5 className={classes.titleLink} data-cypress="exerciseLogUser">
              {log.first} {log.last}
            </h5>
          )}
          <h6 className={classes.title} data-cypress="exerciseLogTitle">
            {log.name}
          </h6>
        </div>
        <div className={classes.metadata}>
          <p className={classes.date} data-cypress="exerciseLogDate">
            {moment(log.date).format('MMM. Do, YYYY')}
          </p>
          <p className={classes.type} data-cypress="exerciseLogType">
            {log.type.toUpperCase()}
          </p>
        </div>
      </div>
      {hovering && isUsersLog && (
        <div className={classes.options}>
          <div className={classes.optionsButtons}>
            <button
              className={classNames(classes.optionsButton, 'options')}
              onClick={(): void => setOptionsOpened(true)}
              disabled={false}
            >
              <p>&#8226;&#8226;&#8226;</p>
            </button>
          </div>
        </div>
      )}
      {optionsOpened && isUsersLog && (
        <div className={classes.options}>
          <div className={classes.optionsButtons}>
            <button
              className={classNames(classes.optionsButton, classes.optionsIcon, 'edit')}
              onClick={(): void => navigate(`/log/edit/${log.log_id}`)}
              disabled={false}
            >
              <p>&#x6a;</p>
            </button>
            <button
              className={classNames(classes.optionsButton, classes.deleteOptionsButton, classes.optionsIcon, 'delete')}
              onClick={(): void => setShowDeleteModal(true)}
              disabled={false}
            >
              <p>&#xe019;</p>
            </button>
          </div>
        </div>
      )}
      <div className={classes.bodySection}>
        <div className={classes.dataFields}>
          {!!log.location && <p data-cypress="exerciseLogLocation">Location: {log.location}</p>}
          {!!log.distance && (
            <p data-cypress="exerciseLogDistance">
              {log.distance} {log.metric}
            </p>
          )}
          {!!log.time && log.time !== '0:00:00' && (
            <p data-cypress="exerciseLogTimePace">
              {shortenTime(log.time)} {log.pace && `(${shortenTime(log.pace)}/mi)`}
            </p>
          )}
        </div>
        {!!log.description && (
          <div className={classes.description} data-cypress="exerciseLogDescription">
            {parseTagsInText(log.description)}
          </div>
        )}
      </div>
      <div className={classes.commentSection}>
        <Comments
          comments={log.comments}
          feel={log.feel}
          logId={log.log_id}
          logUsername={log.username}
          user={user}
          inFeed={inFeed}
          page={page}
          filterBy={filterBy}
          bucket={bucket}
          index={index}
        />
      </div>
      <DeleteLogModal
        onClose={(): void => setShowDeleteModal(false)}
        onDelete={onDeleteLog}
        show={showDeleteModal}
        log={log}
        isDeleting={isDeleting}
      />
      {errorDeleting && (
        <DefaultErrorPopup
          message="Failed to delete this exercise log"
          closeable={true}
          onClose={(): void => setErrorDeleting(false)}
          retryable={true}
          onRetry={onDeleteLog}
        />
      )}
    </div>
  );
};

export default ExerciseLog;
