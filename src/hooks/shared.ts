import {ExerciseFilters, RangeViewExerciseType, RootState} from '../redux/types';
import { useEffect, useState } from 'react';
import {setUserFromStorage} from "../redux/modules/auth";
import {userAuthenticated} from "../utils/auth";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

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

/**
 * Perform a check to see if there is a user signed in.
 */
export const useSignInCheck = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      dispatch(setUserFromStorage(storedUser));
    } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
      history.push('/');
    }
  }, [users, auth.signedInUser, history, dispatch]);
};
