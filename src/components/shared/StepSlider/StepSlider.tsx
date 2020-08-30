/**
 * Component for a custom slider that stops at specific steps.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

import React, {useState} from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";
import classNames from "classnames";

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
            <div className={classes.mainEdge}> </div>
            {steps.map((step, index) => (
                <div className={index ? classes.step : classes.firstStep}>
                    {!!index && <div className={classes.edge}> </div>}
                    <div className={classes.vertex}>
                        <div className={classes.innerVertex} style={{ backgroundColor: steps[index].color }}> </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepSlider;
