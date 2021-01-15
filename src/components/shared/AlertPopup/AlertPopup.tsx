/**
 * Component for an Alert that pops up with warnings or errors.
 * @author Andrew Jarombek
 * @since 8/8/2020
 */

import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Alert, { AlertType } from '../Alert';

interface Props {
  message: ReactNode;
  onClose: () => void;
  type: AlertType;
}

const useStyles = createUseStyles(styles);

const AlertPopup: React.FunctionComponent<Props> = ({ message, onClose, type }) => {
  const classes = useStyles({ type });

  return (
    <div className={classes.alertContainer}>
      <Alert type={type} message={message} onClose={onClose} closeable={false} />
    </div>
  );
};

export default AlertPopup;
