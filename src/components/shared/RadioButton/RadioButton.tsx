/**
 * Component which creates a custom radio button.
 * @author Andrew Jarombek
 * @since 11/19/2020
 */

import React, { memo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  id: string;
  name: string;
  value: string;
  label: React.ReactNode;
  defaultChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: ClassValue;
}

const useStyles = createUseStyles(styles);

const RadioButton: React.FunctionComponent<Props> = ({
  id,
  name,
  value,
  label,
  defaultChecked = false,
  onChange,
  className
}) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.radio, className)}>
      <label>
        <div className={classes.inputWrapper}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            className={classes.input}
            defaultChecked={defaultChecked}
            onChange={onChange}
          />
          <div className={classes.customRadio} />
        </div>
        <div className={classes.customLabel}>{label}</div>
      </label>
    </div>
  );
};

export default memo<Props>(RadioButton);
