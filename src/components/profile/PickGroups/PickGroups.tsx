/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';

interface Props {
  groups?: GroupMember[];
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({ groups }) => {
  const classes = useStyles();

  return <div className={classes.pickGroups}></div>;
};

export default PickGroups;
