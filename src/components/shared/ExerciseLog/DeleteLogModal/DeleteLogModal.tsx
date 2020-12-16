/**
 * Component for a modal that allows users to join or leave teams.
 * @author Andrew Jarombek
 * @since 12/14/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJModal } from 'jarombek-react-components';
import moment from 'moment';
import LoadingSpinner from '../../LoadingSpinner';
import { Log } from '../../../../redux/types';

interface Props {
  onClose: () => void;
  onDelete: () => void;
  show: boolean;
  log: Log;
  isDeleting: boolean;
}

const useStyles = createUseStyles(styles);

const DeleteLogModal: React.FunctionComponent<Props> = ({ onClose, show, log, isDeleting, onDelete }) => {
  const classes = useStyles();

  if (show) {
    return (
      <AJModal backdrop={true} onClickBackground={onClose} className="deleteLogModal">
        <div className={classes.deleteModal}>
          <p>
            Are you sure you want to delete your <b>{moment(log.date).format('MMM. Do')} </b>
            exercise log <b>"{log.name}"</b>?
          </p>
          <div className={classes.deleteModalButtons}>
            <AJButton
              type="contained"
              onClick={onDelete}
              className={isDeleting && classes.disabledDeleteButton}
              disabled={isDeleting}
            >
              <p>{isDeleting ? 'DELETING' : 'DELETE'}</p>
              {isDeleting && <LoadingSpinner className={classes.deleteLogSpinner} />}
            </AJButton>
            <AJButton type="outlined" onClick={onClose}>
              <p>CANCEL</p>
            </AJButton>
          </div>
        </div>
      </AJModal>
    );
  } else {
    return null;
  }
};

export default DeleteLogModal;
