/**
 * Component for an Alert that pops up with warnings or errors.
 * @author Andrew Jarombek
 * @since 8/8/2020
 */

import React, { ReactNode, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Alert, { AlertType } from '../Alert';
import { timeout } from '../../../utils/timeout';

interface Props {
  message: ReactNode;
  onClose: () => void;
  type: AlertType;
  closeable?: boolean;
  autoCloseInterval?: number;
}

const useStyles = createUseStyles(styles);

const AlertPopup: React.FunctionComponent<Props> = ({
  message,
  onClose,
  type,
  closeable = false,
  autoCloseInterval = 0
}) => {
  const classes = useStyles({ type });

  const autoClose = useCallback(
    async (autoCloseInterval: number): Promise<void> => {
      await timeout(autoCloseInterval);
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (autoCloseInterval) {
      autoClose(autoCloseInterval);
    }
  }, [autoCloseInterval, autoClose]);

  return (
    <div className={classes.alertContainer}>
      <Alert type={type} message={message} onClose={onClose} closeable={closeable} />
    </div>
  );
};

export default AlertPopup;
