/**
 * Component which creates a custom check box.
 * @author Andrew Jarombek
 * @since 1/20/2021
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  id?: string;
  checked: boolean;
  onChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const CheckBox: React.FunctionComponent<Props> = ({ id, checked, onChange, className }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.checkBox, className)} onClick={onChange}>
      <input type="checkbox" id={id} className={classes.input} checked={checked} />
      <span />
    </div>
  );
};

export default CheckBox;
