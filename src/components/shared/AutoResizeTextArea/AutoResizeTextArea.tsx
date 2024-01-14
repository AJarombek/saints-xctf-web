/**
 * Component for a text area that grows as text is added and shrinks as text is removed.
 * @author Andrew Jarombek
 * @since 8/30/2020
 */

import React, { forwardRef, RefObject, useCallback, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

interface Props {
  maxLength: number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  useCustomValue?: boolean;
  value?: string;
  disabled: boolean;
  className: ClassValue;
}

type TRef = HTMLTextAreaElement;

const useStyles = createUseStyles(styles);

// eslint-disable-next-line react/display-name
const AutoResizeTextArea = forwardRef<TRef, Props>(
  ({ maxLength, placeholder, onChange, useCustomValue, value, disabled, className }, ref: RefObject<any>) => {
    const classes = useStyles();

    const onKeyUp = useCallback((): void => {
      if (ref?.current) {
        ref.current.style.height = '25px';
        ref.current.style.height = `${ref.current.scrollHeight + 4}px`;
      }
    }, [ref]);

    useEffect(() => {
      if (ref) {
        onKeyUp();
      }
    }, [ref, onKeyUp]);

    return (
      <textarea
        className={classNames(classes.textArea, className)}
        maxLength={maxLength}
        placeholder={placeholder}
        value={useCustomValue ? value : ref?.current?.value}
        ref={ref}
        onChange={onChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
      />
    );
  },
);

export default AutoResizeTextArea;
