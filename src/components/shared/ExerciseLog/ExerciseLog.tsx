/**
 * ExerciseLog component which displays a published exercise log, often in a log feed.
 * @author Andrew Jarombek
 * @since 7/26/2020
 */

import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { DeletedLog, DeletedLogs, Log, RootState, User } from '../../../redux/types';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Comments from '../Comments/Comments';
import { parseTagsInText, shortenTime } from '../../../utils/logs';
import classNames from 'classnames';
import { AJButton, AJModal } from 'jarombek-react-components';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLog, logFeed } from '../../../redux/modules/logs';

interface Props {
  log: Log;
  user: User;
  page: number;
  filterBy: string;
  bucket: string;
  index: number;
  linkProfile?: number;
}

const useStyles = createUseStyles(styles);

const ExerciseLog: React.FunctionComponent<Props> = ({
  log,
  user,
  page,
  filterBy,
  bucket,
  index,
  linkProfile = true
}) => {
  const history = useHistory();
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
      dispatch(logFeed(filterBy, bucket, 10, 10 * (page - 1)));
      setIsDeleting(false);
      setShowDeleteModal(false);
    }

    if (!deletedInfo.deleted && !deletedInfo.serverError && !deletedInfo.didInvalidate) {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setErrorDeleting(true);
    }
  }, [deletedLogs, log, bucket, filterBy, page, dispatch]);

  return (
    <div
      className={classNames(classes.exerciseLog, 'exerciseLog')}
      onMouseOver={(): void => setHovering(true)}
      onMouseLeave={(): void => {
        setHovering(false);
        setOptionsOpened(false);
      }}
    >
      <div className={classes.headerSection}>
        <div className={classes.titles}>
          {linkProfile ? (
            <Link to={`/profile/${log?.username}`} className={classes.titleLink}>
              {log.first} {log.last}
            </Link>
          ) : (
            <h5 className={classes.titleLink}>
              {log.first} {log.last}
            </h5>
          )}
          <h6 className={classes.title}>{log.name}</h6>
        </div>
        <div className={classes.metadata}>
          <p className={classes.date}>{moment(log.date).format('MMM. Do, YYYY')}</p>
          <p className={classes.type}>{log.type.toUpperCase()}</p>
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
              onClick={(): void => history.push(`/log/edit/${log.log_id}`)}
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
          {!!log.location && <p>Location: {log.location}</p>}
          {!!log.distance && (
            <p>
              {log.distance} {log.metric}
            </p>
          )}
          {!!log.time && log.time !== '0:00:00' && (
            <p>
              {shortenTime(log.time)} {log.pace && `(${shortenTime(log.pace)}/mi)`}
            </p>
          )}
        </div>
        <div className={classes.description}>{!!log.description && parseTagsInText(log.description)}</div>
      </div>
      <div className={classes.commentSection}>
        <Comments
          comments={log.comments}
          feel={log.feel}
          logId={log.log_id}
          user={user}
          page={page}
          filterBy={filterBy}
          bucket={bucket}
          index={index}
        />
      </div>
      {showDeleteModal && (
        <AJModal backdrop={true} onClickBackground={(): void => setShowDeleteModal(false)} className="deleteLogModal">
          <div className={classes.deleteModal}>
            <p>
              Are you sure you want to delete your <b>{moment(log.date).format('MMM. Do')} </b>
              exercise log <b>"{log.name}"</b>?
            </p>
            <div className={classes.deleteModalButtons}>
              <AJButton
                type="contained"
                onClick={(): void => {
                  dispatch(deleteLog(log.log_id));
                }}
                className={isDeleting && classes.disabledDeleteButton}
                disabled={isDeleting}
              >
                <p>{isDeleting ? 'DELETING' : 'DELETE'}</p>
                {isDeleting && <LoadingSpinner className={classes.deleteLogSpinner} />}
              </AJButton>
              <AJButton type="outlined" onClick={(): void => setShowDeleteModal(false)}>
                <p>CANCEL</p>
              </AJButton>
            </div>
          </div>
        </AJModal>
      )}
    </div>
  );
};

export default ExerciseLog;
