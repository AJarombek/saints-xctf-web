/**
 * Component for a text area that grows as text is added and shrinks as text is removed.
 * @author Andrew Jarombek
 * @since 8/30/2020
 */

import React, {forwardRef, RefObject} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";
import {ClassValue} from "classnames/types";

interface IProps {
    maxLength: number;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled: boolean;
    className: ClassValue;
}

const useStyles = createUseStyles(styles);

const AutoResizeTextArea: React.FunctionComponent<IProps> = forwardRef((
    {maxLength, placeholder, onChange, disabled, className},
     ref: RefObject<any>
) => {
    const classes = useStyles();

    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "25px";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 4}px`;
    };

    return (
        <textarea
            className={classNames(classes.textArea, className)}
            maxLength={maxLength}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onKeyUp={onKeyUp}
            disabled={disabled}
        />
    );
});

export default AutoResizeTextArea;
