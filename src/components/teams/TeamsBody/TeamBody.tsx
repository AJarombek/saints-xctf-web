/**
 * TeamsBody component which shows a list of teams and the groups in them.
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

const TeamsBody: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  return <div className={classes.teamsBody}> </div>;
};

export default TeamsBody;
