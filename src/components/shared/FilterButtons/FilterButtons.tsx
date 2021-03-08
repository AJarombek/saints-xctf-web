/**
 * Component for a filter of exercise logs.
 * @author Andrew Jarombek
 * @since 11/10/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { AJButton, AJButtonGroup } from 'jarombek-react-components';
import { ExerciseFilters } from '../../../redux/types';

interface Props {
  selectedFilters?: ExerciseFilters;
  setSelectedFilters?: (filter: ExerciseFilters) => void;
}

const useStyles = createUseStyles(styles);

const FilterButtons: React.FunctionComponent<Props> = ({ selectedFilters, setSelectedFilters }) => {
  const classes = useStyles();

  return (
    <AJButtonGroup className={classes.filterButtons}>
      <AJButton
        type={selectedFilters.run ? 'contained' : 'outlined'}
        onClick={(): void => setSelectedFilters({ ...selectedFilters, run: !selectedFilters.run })}
      >
        Run
      </AJButton>
      <AJButton
        type={selectedFilters.bike ? 'contained' : 'outlined'}
        onClick={(): void => setSelectedFilters({ ...selectedFilters, bike: !selectedFilters.bike })}
      >
        Bike
      </AJButton>
      <AJButton
        type={selectedFilters.swim ? 'contained' : 'outlined'}
        onClick={(): void => setSelectedFilters({ ...selectedFilters, swim: !selectedFilters.swim })}
      >
        Swim
      </AJButton>
      <AJButton
        type={selectedFilters.other ? 'contained' : 'outlined'}
        onClick={(): void => setSelectedFilters({ ...selectedFilters, other: !selectedFilters.other })}
      >
        Other
      </AJButton>
    </AJButtonGroup>
  );
};

export default FilterButtons;
