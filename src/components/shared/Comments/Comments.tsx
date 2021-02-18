/**
 * Comments component which displays a list of comments and allows for a new comment to be created.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { Comment, NewComments, RootState, User } from '../../../redux/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { parseTagsInText } from '../../../utils/logs';
import DefaultErrorPopup from '../DefaultErrorPopup/DefaultErrorPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, postComment } from '../../../redux/modules/logs';

interface Props {
  comments: Comment[];
  feel: number;
  logId: number;
  user: User;
  inFeed: boolean;
  page: number;
  filterBy: string;
  bucket: string;
  index: number;
}

const useStyles = createUseStyles(styles);

const Comments: React.FunctionComponent<Props> = ({
  comments,
  feel,
  logId,
  user,
  inFeed,
  page,
  filterBy,
  bucket,
  index
}) => {
  const classes = useStyles({ feel });

  const dispatch = useDispatch();
  const newComments: NewComments = useSelector((state: RootState) => state.logs.newComments);

  const [content, setContent] = useState('');
  const [showError, setShowError] = useState(false);
  const [prevErrorTime, setPrevErrorTime] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (newComments) {
      const newComment = Object.entries(newComments).filter(([commentLogId, _]) => +commentLogId === logId);

      if (newComment.length) {
        if (newComment[0][1].serverError && newComment[0][1].lastUpdated !== prevErrorTime) {
          setShowError(true);
          setPrevErrorTime(newComment[0][1].lastUpdated);
        }

        if (!newComment[0][1].isFetching) {
          setIsCreating(false);

          const content = textAreaRef.current.value;

          if (inFeed) {
            dispatch(addComment(logId, content, user.username, user.first, user.last, filterBy, bucket, page, index));
          }

          textAreaRef.current.value = '';
        }
      }
    }
  }, [
    bucket,
    dispatch,
    filterBy,
    inFeed,
    index,
    logId,
    newComments,
    page,
    prevErrorTime,
    user.first,
    user.last,
    user.username
  ]);

  const onTextAreaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    e.currentTarget.style.height = '25px';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 4}px`;
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onCreateComment = (content: string, user: User): void => {
    if (content) {
      setIsCreating(true);
      dispatch(postComment(logId, user.username, user.first, user.last, content));
    }
  };

  return (
    <div className={classNames(classes.comments, 'comments')}>
      <div className={classes.newCommentForm}>
        <textarea
          className={classNames(
            classes.newComment,
            content ? classes.focusNewComment : classes.blurNewComment,
            isCreating && classes.newCommentDisabled
          )}
          maxLength={1000}
          placeholder="Comment"
          ref={textAreaRef}
          onChange={onTextAreaChange}
          onKeyUp={onTextAreaKeyUp}
          disabled={isCreating}
        />
        {!!content && (
          <button
            className={classNames('addIcon', classes.addIcon, isCreating && classes.addIconDisabled)}
            onClick={(): void => onCreateComment(content, user)}
            disabled={isCreating}
          >
            <p>&#x4c;</p>
          </button>
        )}
      </div>
      {comments && (
        <div className={classNames('commentList', classes.commentList)}>
          {comments.map((comment, index) => (
            <div className={classNames('comment', classes.comment)} key={index}>
              <div className={classes.commentHeader}>
                <Link to={`/profile/${comment.username}`} className={classes.titleLink}>
                  {comment.first} {comment.last}
                </Link>
                <p className={classes.date}>{moment(comment.time).format('MMM. Do, YYYY h:mm:ss A')}</p>
              </div>
              <div className={classes.commentBody}>{parseTagsInText(comment.content)}</div>
            </div>
          ))}
        </div>
      )}
      {showError && (
        <DefaultErrorPopup
          message="An unexpected error occurred while adding a comment"
          onClose={(): void => setShowError(false)}
        />
      )}
    </div>
  );
};

export default Comments;
