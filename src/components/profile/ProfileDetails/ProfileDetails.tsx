/**
 * Component for a tab on the profile page which shows a details about a user's profile.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { UserMeta } from '../../../redux/types';

interface Props {
  user: UserMeta;
}

const useStyles = createUseStyles(styles);

const ProfileDetails: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.profileDetails}>
      <p>Member Since: {user.member_since}</p>
      <div>
        <h5>Exercise Statistics</h5>
      </div>
      <div>
        <h5>Running Statistics</h5>
      </div>
      <div>
        <h5>Feel Statistics</h5>
      </div>
    </div>
  );
};

export default ProfileDetails;
