/**
 * Component for picking a group to join.
 * @author Andrew Jarombek
 * @since 12/7/2020
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMember } from '../../../redux/types';
import { AJButton } from 'jarombek-react-components';

interface Props {
  group?: GroupMember;
}

const useStyles = createUseStyles(styles);

const PickGroup: React.FunctionComponent<Props> = ({ group }) => {
  const classes = useStyles({ status: group.status });

  return (
    <div className={classes.group}>
      <p className={classes.groupTitle}>{group.group_title}</p>
      <AJButton type="text" className={classes.groupActionIcon}>
        {(group.status === 'accepted' || group.status === 'pending') && <p>&#x0051;</p>}
        {group.status === null && <p>&#x0050;</p>}
      </AJButton>
    </div>
  );
};

export default PickGroup;
