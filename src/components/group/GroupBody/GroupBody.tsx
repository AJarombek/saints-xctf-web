/**
 * GroupBody component which shows logs, statistics, and other details about a group.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { User } from '../../../redux/types';

interface Props {
  user: User;
}

const useStyles = createUseStyles(styles);

const GroupBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  return <div className={classes.groupBody}> </div>;
};

export default GroupBody;
