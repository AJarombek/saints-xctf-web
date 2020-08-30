/**
 * Component for a custom slider that stops at specific steps.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

import React, {useEffect, useState, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useRef} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";
import color from 'color';

interface Step {
    value: any;
    color: string;
}

interface IProps {
    steps: Step[];
    defaultValue: number;
    onValueChange?: (value: number) => void;
}

const useStyles = createUseStyles(styles);

const StepSlider: React.FunctionComponent<IProps> = ({ steps, defaultValue, onValueChange }) => {
    const sliderRef = useRef(null);

    const [value, setValue] = useState(defaultValue);
    const [pressed, setPressed] = useState(false);

    const classes = useStyles({
        stepCount: steps?.length ?? 0,
        value
    });

    useEffect(() => {
        return () => {
            removeEventListeners();
        }
    }, []);

    useEffect(() => {
        if (onValueChange) {
            onValueChange(value);
        }
    }, [value, onValueChange]);

    const handleChange = (e: ReactMouseEvent | MouseEvent) => {
        const stepCount = steps?.length ?? 1;
        const x = e.pageX - sliderRef.current.offsetLeft;
        const stepLength = (sliderRef.current.offsetWidth / stepCount) ?? 1;

        const offsetAdjustedX = Math.max(x - (stepLength / 2), 0);
        setValue(Math.min(Math.round(offsetAdjustedX / stepLength), stepCount - 1));
    };

    const onTouchStart = (e: ReactTouchEvent) => {
        setPressed(true);
        // handleChange(e);

        window.addEventListener("touchend", onMouseUp);
    };

    const onMouseDown = (e: ReactMouseEvent) => {
        setPressed(true);
        handleChange(e);

        window.addEventListener("mousemove", handleChange);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseUp = (e: MouseEvent) => {
        removeEventListeners();
    };

    const removeEventListeners = () => {
        window.removeEventListener("mousemove", handleChange);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchend", onMouseUp);
    };

    return (
        <div
            className={classNames(classes.stepSlider, 'stepSlider')}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            ref={sliderRef}
        >
            <div className={classes.mainEdge}>
                <div
                    className={classes.filledEdge}
                    style={{ backgroundColor: color(steps[value].color).darken(0.25).hex() }}>
                </div>
                <div className={classes.currentVertex}>
                    <div
                        className={classes.currentInnerVertex}
                        style={{ backgroundColor: steps[value].color }}>
                    </div>
                </div>
            </div>
            {steps.map((step, index) => (
                <div className={index ? classes.step : classes.firstStep}>
                    {!!index && <div className={classes.edge}> </div>}
                    <div
                        className={classes.vertex}
                        style={{
                            backgroundColor: index < value ? color(steps[value].color).darken(0.25).hex() : '#BBB'
                        }}
                    >
                        <div
                            className={classes.innerVertex}
                            style={{ backgroundColor: index < value ? 'transparent' : steps[index].color }}>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepSlider;
