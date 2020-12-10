/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';
import PickGroup from '../PickGroup';
import { useDispatch } from 'react-redux';

interface Props {
  teamName?: string;
  groups?: GroupMember[];
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({ teamName, groups }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);

  const onLoadMore = (): void => {
    setShowMore(true);
  };

  const onShowLess = (): void => {
    setShowMore(false);
  };

  if (groups) {
    return (
      <div>
        <div className={classes.pickGroups}>
          {groups.map((group) => (
            <PickGroup key={`${teamName}-${group.group_name}`} group={group} />
          ))}
        </div>
        <div className={classes.showMore}>
          {showMore ? (
            <div onClick={onShowLess}>
              <p>&#x0042;</p>
              <p>Show Less</p>
            </div>
          ) : (
            <div onClick={onLoadMore}>
              <p>&#x0043;</p>
              <p>Load More</p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PickGroups;
