/**
 * Component for a custom slider that stops at specific steps.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

import React, {useState} from 'react';
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
}

const useStyles = createUseStyles(styles);

const StepSlider: React.FunctionComponent<IProps> = ({ steps, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);

    const classes = useStyles({
        stepCount: steps?.length ?? 0,
        value
    });

    return (
        <div className={classNames(classes.stepSlider, 'stepSlider')}>
            <div className={classes.mainEdge}>
                <div className={classes.filledEdge} style={{ backgroundColor: steps[value].color }}> </div>
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
                        style={{ backgroundColor: index < value ? steps[value].color : '#BBB' }}
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
