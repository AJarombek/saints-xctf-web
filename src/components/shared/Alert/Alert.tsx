/**
 * Component for an Alert that pops up with warnings or errors.
 * @author Andrew Jarombek
 * @since 1/14/2021
 */

import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

export type AlertType = 'error' | 'warning' | 'info' | 'success';

interface Props {
  message: ReactNode;
  type: AlertType;
  closeable: boolean;
  onClose?: () => void;
}

const useStyles = createUseStyles(styles);

const Alert: React.FunctionComponent<Props> = ({ message, type, closeable, onClose }) => {
  const classes = useStyles({ type });

  let alertIcon;
  switch (type) {
    case 'error':
      alertIcon = '\ue062';
      break;
    case 'info':
      alertIcon = '\ue064';
      break;
    case 'warning':
      alertIcon = '\ue063';
      break;
    case 'success':
      alertIcon = '\ue052';
      break;
    default:
      alertIcon = '\ue062';
  }

  return (
    <div className={classes.alert} data-cypress="alert">
      <p className={classes.alertIcon}>{alertIcon}</p>
      <div className={classes.message}>{message}</div>
      {closeable && (
        <p className={classes.closeIcon} onClick={onClose}>
          &#x4d;
        </p>
      )}
    </div>
  );
};

export default Alert;
