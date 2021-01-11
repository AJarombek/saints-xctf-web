/**
 * Component for a tab on the group page which shows a leaderboard of the group members exercises.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

const useStyles = createUseStyles(styles);

interface Props {}

const Leaderboard: React.FunctionComponent<Props> = ({}) => {
  const classes = useStyles();

  return <div className={classes.leaderboard}>Leaderboard</div>;
};

export default Leaderboard;
