/**
 * Custom React hooks which are used throughout the application.
 * @author Andrew Jarombek
 * @since 11/12/2020
 */

import { ExerciseFilters, GroupMember, RangeViewExerciseType, RootState } from '../redux/types';
import { useEffect, useState } from 'react';
import { setUserFromStorage } from '../redux/modules/auth';
import { userAuthenticated } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGroupMemberships } from '../redux/modules/memberships';

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
export const useSignInCheck = (redirect = true): boolean => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const users = useSelector((state: RootState) => state.auth.user);

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!Object.keys(users).length && storedUser) {
      dispatch(setUserFromStorage(storedUser));
    } else if (!userAuthenticated(users, auth.signedInUser) && !storedUser) {
      if (redirect) {
        navigate('/');
      }
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
  }, [users, auth.signedInUser, navigate, dispatch, redirect]);

  return isSignedIn;
};

export const useAdminCheck = (redirect = true): boolean => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth.auth);
  const membershipInfo = useSelector((state: RootState) => state.memberships.groups);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (auth.signedInUser) {
      const adminCount = membershipInfo.items?.filter(
        (member: GroupMember) => member.user === 'admin' && member.status === 'accepted'
      ).length;

      if (!membershipInfo.isFetching && !membershipInfo.serverError && !membershipInfo.items) {
        dispatch(getGroupMemberships(auth.signedInUser));
      } else if (!adminCount || membershipInfo.serverError) {
        if (redirect) {
          navigate('/');
        }
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    }
  }, [auth.signedInUser, dispatch, navigate, membershipInfo, redirect]);

  return isAdmin;
};

export const useHeaders = (defaultHeaders: string[], isAdmin: boolean): string[] => {
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    const newHeaders = [...defaultHeaders];

    if (isAdmin) {
      newHeaders.push('admin');
    }

    if (headers.length !== newHeaders.length) {
      setHeaders(newHeaders);
    }
  }, [defaultHeaders, headers.length, isAdmin]);

  return headers;
};
