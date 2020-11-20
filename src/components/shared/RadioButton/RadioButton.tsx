/**
 * Component which creates a custom radio button.
 * @author Andrew Jarombek
 * @since 11/19/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';

interface Props {
  id: string;
  name: string;
  value: string;
  label: React.ReactNode;
  defaultChecked?: boolean;
}

const useStyles = createUseStyles(styles);

const RadioButton: React.FunctionComponent<Props> = ({ id, name, value, label, defaultChecked = false }) => {
  const classes = useStyles();

  return (
    <div className={classes.radio}>
      <label>
        <input type="radio" id={id} name={name} value={value} checked={defaultChecked} className={classes.input} />
        <div className={classes.customRadio} />
        <div className={classes.customLabel}>{label}</div>
      </label>
    </div>
  );
};

export default RadioButton;
