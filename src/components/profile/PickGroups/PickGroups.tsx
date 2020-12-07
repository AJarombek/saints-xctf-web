/**
 * Component for picking groups to join.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';
import { AJButton } from 'jarombek-react-components';

interface Props {
  teamName?: string;
  groups?: GroupMember[];
}

const useStyles = createUseStyles(styles);

const PickGroups: React.FunctionComponent<Props> = ({ teamName, groups }) => {
  const classes = useStyles();

  return (
    <div className={classes.pickGroups}>
      {!!groups && (
        <>
          {groups.map((group) => (
            <div key={`${teamName}-${group.group_name}`} className={classes.group}>
              <p className={classes.groupTitle}>{group.group_title}</p>
              <AJButton type="text" className={classes.groupActionIcon}>
                {(group.status === 'accepted' || group.status === 'pending') && <p>&#x0050;</p>}
                {group.status === null && <p>&#x0051;</p>}
              </AJButton>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PickGroups;
