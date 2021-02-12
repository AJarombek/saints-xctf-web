/**
 * ProgressBar component.
 * @author Andrew Jarombek
 * @since 2/11/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';

interface Props {
  progress: number;
  inProgress: boolean;
}

const useStyles = createUseStyles(styles);

const ProgressBar: React.FunctionComponent<Props> = ({ progress, inProgress }) => {
  const classes = useStyles({ progress, inProgress });

  return (
    <div className={classes.progressBar}>
      <div className={classNames(classes.bar, classes.barFull)} />
      <div className={classNames(classes.bar, classes.barProgress)} />
    </div>
  );
};

export default ProgressBar;
