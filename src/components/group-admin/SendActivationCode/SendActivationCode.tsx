/**
 * Component for sending an activation code to an email.
 * @author Andrew Jarombek
 * @since 1/19/2021
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { useDispatch } from 'react-redux';

interface Props {
  groupId: number;
}

const useStyles = createUseStyles(styles);

const SendActivationCode: React.FunctionComponent<Props> = ({ groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return <div className={classes.container}></div>;
};

export default SendActivationCode;
