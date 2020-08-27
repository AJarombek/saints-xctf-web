/**
 * Utility functions for dealing with user authentication.
 * @author Andrew Jarombek
 * @since 5/9/2020
 */

import {Users} from "../redux/types";

/**
 * Determine if is a user is signed in and properly authenticated.
 * @param user An object of user objects stored in redux.
 * @param signedInUser The username of the user to test whether or not they are signed in.
 * @return {@code true} if the user is authenticated and signed in, {@code false} otherwise.
 */
export function userAuthenticated(user: Users, signedInUser: string) {
  if (!Object.keys(user).length) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      signedInUser = storedUser.username;
      user = {
        [storedUser.username]: {
          ...storedUser
        }
      }
    }
  }

  if (!user) {
    return false;
  } else if (!user[signedInUser]?.isFetching && !user[signedInUser]?.didInvalidate) {
    return true;
  }

  return false;
}
