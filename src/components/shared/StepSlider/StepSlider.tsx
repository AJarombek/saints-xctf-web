/**
 * Component for a custom slider that stops at specific steps.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

import React from 'react';
import {createUseStyles} from "react-jss";
import styles from "./styles";

interface Step {
    value: any;
    color: string;
}

interface IProps {
    steps: Step[];
}

const useStyles = createUseStyles(styles);

const StepSlider: React.FunctionComponent<IProps> = ({ steps }) => {
    const classes = useStyles({ stepCount: steps?.length ?? 0 });

    return (
        <div className={classes.stepSlider}>
            {steps.map((step, index) => (
                <div className={classes.step}>
                    {!!index && <div className={classes.edge}> </div>}
                    <div className={classes.vertex}> </div>
                </div>
            ))}
        </div>
    );
};

export default StepSlider;
