/**
 * Component for a custom slider that stops at specific steps.
 * @author Andrew Jarombek
 * @since 8/29/2020
 */

import React, { useEffect, MouseEvent as ReactMouseEvent, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import classNames from 'classnames';
import color from 'color';

interface Step {
  value: any;
  color: string;
}

interface Props {
  steps: Step[];
  value: number;
  onValueChange?: (value: number) => void;
}

const useStyles = createUseStyles(styles);

const StepSlider: React.FunctionComponent<Props> = ({ steps, value, onValueChange }) => {
  const sliderRef = useRef(null);

  const classes = useStyles({
    stepCount: steps?.length ?? 0,
    value,
  });

  const removeEventListeners = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.removeEventListener('mousemove', handleChange);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.removeEventListener('mouseup', onMouseUp);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.removeEventListener('touchend', onMouseUp);
  };

  useEffect(() => {
    return (): void => {
      removeEventListeners();
    };
  }, [removeEventListeners]);

  const handleChange = (e: ReactMouseEvent | MouseEvent): void => {
    const stepCount = steps?.length ?? 1;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const stepLength = sliderRef.current.offsetWidth / stepCount ?? 1;

    const offsetAdjustedX = Math.max(x - stepLength / 2, 0);
    onValueChange(Math.min(Math.round(offsetAdjustedX / stepLength), stepCount - 1));
  };

  const onTouchStart = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('touchend', onMouseUp);
  };

  const onMouseDown = (e: ReactMouseEvent): void => {
    handleChange(e);

    window.addEventListener('mousemove', handleChange);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseUp = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    removeEventListeners();
  };

  return (
    <div
      className={classNames(classes.stepSlider, 'stepSlider')}
      data-cypress="stepSlider"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      ref={sliderRef}
    >
      <div className={classes.mainEdge}>
        <div className={classes.filledEdge} style={{ backgroundColor: color(steps[value].color).darken(0.25).hex() }} />
        <div className={classes.currentVertex}>
          <div className={classes.currentInnerVertex} style={{ backgroundColor: steps[value].color }} />
        </div>
      </div>
      {steps.map((step, index) => (
        <div className={index ? classes.step : classes.firstStep} key={index}>
          {!!index && <div className={classes.edge}> </div>}
          <div
            className={classes.vertex}
            style={{
              backgroundColor: index < value ? color(steps[value].color).darken(0.25).hex() : '#BBB',
            }}
          >
            <div
              className={classes.innerVertex}
              style={{ backgroundColor: index < value ? 'transparent' : steps[index].color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepSlider;
