/**
 * Component for editing a group as an admin.
 * @author Andrew Jarombek
 * @since 1/26/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

interface Props {
  groupId: number;
}

const useStyles = createUseStyles(styles);

const EditGroup: React.FunctionComponent<Props> = ({ groupId }) => {
  const classes = useStyles();

  return <div className={classes.editGroup}></div>;
};

export default EditGroup;
