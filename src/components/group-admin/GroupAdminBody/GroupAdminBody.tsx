/**
 * GroupAdminBody component which allows admins to manage users, notifications, and group information.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta } from '../../../redux/types';
import PageTabs from '../../shared/PageTabs';
import { useDispatch } from 'react-redux';
import { getGroup } from '../../../redux/modules/groups';
import classNames from 'classnames';
import ManageUsers from '../ManageUsers/ManageUsers';

interface Props {
  group: GroupMeta;
  groupId: number;
}

export enum GroupAdminTab {
  MANAGE_USERS,
  SEND_ACTIVATION_CODE,
  SEND_NOTIFICATIONS,
  EDIT_GROUP
}

const useStyles = createUseStyles(styles);

const GroupAdminBody: React.FunctionComponent<Props> = ({ group, groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [tab, setTab] = useState<GroupAdminTab>(GroupAdminTab.MANAGE_USERS);

  useEffect(() => {
    if (!group) {
      dispatch(getGroup(+groupId));
    }
  }, [groupId, group, dispatch]);

  const tabs = useMemo(
    () => [
      {
        tab: GroupAdminTab.MANAGE_USERS,
        onView: (): void => setTab(GroupAdminTab.MANAGE_USERS),
        content: 'Manage Users'
      },
      {
        tab: GroupAdminTab.SEND_ACTIVATION_CODE,
        onView: (): void => setTab(GroupAdminTab.SEND_ACTIVATION_CODE),
        content: 'Send Activation Code'
      },
      {
        tab: GroupAdminTab.SEND_NOTIFICATIONS,
        onView: (): void => setTab(GroupAdminTab.SEND_NOTIFICATIONS),
        content: 'Send Notifications'
      },
      { tab: GroupAdminTab.EDIT_GROUP, onView: (): void => setTab(GroupAdminTab.EDIT_GROUP), content: 'Edit Group' }
    ],
    []
  );

  return (
    <div className={classes.groupAdminBody}>
      <aside>
        <h5 className={classNames(classes.title, classes.text)}>{group?.group_title}</h5>
        <div className={classNames(classes.subTitle, classes.text)}>Team Name</div>
        <PageTabs currentTab={tab} tabs={tabs} />
      </aside>
      <section>
        {tab === GroupAdminTab.MANAGE_USERS && <ManageUsers groupId={groupId} />}
        {tab === GroupAdminTab.SEND_ACTIVATION_CODE && <></>}
        {tab === GroupAdminTab.SEND_NOTIFICATIONS && <></>}
        {tab === GroupAdminTab.EDIT_GROUP && <></>}
      </section>
    </div>
  );
};

export default GroupAdminBody;
