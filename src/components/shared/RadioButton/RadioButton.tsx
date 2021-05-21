/**
 * Component which creates a custom radio button.
 * @author Andrew Jarombek
 * @since 11/19/2020
 */

import React, { forwardRef, RefObject } from 'react';
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

type TRef = HTMLInputElement;

const useStyles = createUseStyles(styles);

// eslint-disable-next-line react/display-name
const RadioButton = forwardRef<TRef, Props>(
  ({ id, name, value, label, defaultChecked = false, onChange, className }, ref: RefObject<HTMLInputElement>) => {
    const classes = useStyles();

    return (
      <div className={classNames(classes.radio, className)} data-cypress="radioButton">
        <label>
          <div className={classes.inputWrapper}>
            <input
              type="radio"
              ref={ref}
              id={id}
              name={name}
              value={value}
              className={classes.input}
              defaultChecked={defaultChecked}
              onChange={onChange}
            />
            <div className={classes.customRadio} data-cypress="customRadio" />
          </div>
          <div className={classNames(classes.customLabel, 'radioButtonLabel')}>{label}</div>
        </label>
      </div>
    );
  }
);

export default RadioButton;
