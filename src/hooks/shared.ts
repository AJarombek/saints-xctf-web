import { ExerciseFilters, RangeViewExerciseType } from '../redux/types';
import { useEffect, useState } from 'react';

/**
 * Custom React hook which constructs an exercise type string from an exercise filter object.
 * @param selectedFilters The resulting exercise type string (see {@code RangeViewExerciseType}).
 */
export const useExerciseFilter = (selectedFilters: ExerciseFilters): RangeViewExerciseType => {
  const [filter, setFilter] = useState<RangeViewExerciseType>('r');

  useEffect(() => {
    setFilter(
      (`${selectedFilters.run ? 'r' : ''}${selectedFilters.bike ? 'b' : ''}` +
        `${selectedFilters.swim ? 's' : ''}${selectedFilters.other ? 'o' : ''}`) as RangeViewExerciseType
    );
  }, [selectedFilters]);

  return filter;
};
