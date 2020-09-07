/**
 * Component for a text area that grows as text is added and shrinks as text is removed.
 * @author Andrew Jarombek
 * @since 8/30/2020
 */

import React, {forwardRef, RefObject, useEffect} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";
import {ClassValue} from "classnames/types";

interface IProps {
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

const AutoResizeTextArea = forwardRef<TRef, IProps>((
    {maxLength, placeholder, onChange, useCustomValue, value, disabled, className},
     ref: RefObject<any>
) => {
    const classes = useStyles();

    useEffect(() => {
        if (ref) {
            onKeyUp();
        }
    }, [ref]);

    const onKeyUp = () => {
        ref.current.style.height = "25px";
        ref.current.style.height = `${ref.current.scrollHeight + 4}px`;
    };

    return (
        <textarea
            className={classNames(classes.textArea, className)}
            maxLength={maxLength}
            placeholder={placeholder}
            value={useCustomValue ? value : ref.current?.value}
            ref={ref}
            onChange={onChange}
            onKeyUp={onKeyUp}
            disabled={disabled}
        />
    );
});

export default AutoResizeTextArea;
