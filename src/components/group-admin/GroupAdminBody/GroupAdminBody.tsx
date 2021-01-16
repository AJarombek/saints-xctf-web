/**
 * GroupAdminBody component which allows admins to manage users, notifications, and group information.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta, MemberDetailsMeta, RootState } from '../../../redux/types';
import PageTabs from '../../shared/PageTabs';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, getGroupMembers } from '../../../redux/modules/groups';
import { useRouteMatch } from 'react-router-dom';

interface Props {
  group: GroupMeta;
}

export enum GroupAdminTab {
  MANAGE_USERS,
  SEND_ACTIVATION_CODE,
  SEND_NOTIFICATIONS,
  EDIT_GROUP
}

const useStyles = createUseStyles(styles);

const GroupAdminBody: React.FunctionComponent<Props> = ({ group }) => {
  const routeMatch = useRouteMatch();
  const classes = useStyles();

  const dispatch = useDispatch();
  const membersInfo = useSelector((state: RootState) => state.groups.members ?? {});

  const [tab, setTab] = useState<GroupAdminTab>(GroupAdminTab.MANAGE_USERS);

  const groupId = useMemo(() => {
    const { id: groupId } = routeMatch.params as { id: string };
    return groupId;
  }, [routeMatch.params]);

  const members = useMemo(() => {
    return membersInfo[groupId]?.items ?? [];
  }, [membersInfo, groupId]);

  useEffect(() => {
    if (!group) {
      dispatch(getGroup(+groupId));
    }
  }, [groupId, group, dispatch]);

  useEffect(() => {
    const groupMembers: MemberDetailsMeta = membersInfo[groupId];
    if (!groupMembers?.items && !groupMembers?.isFetching && !groupMembers?.serverError) {
      dispatch(getGroupMembers(+groupId));
    }
  }, [dispatch, groupId, membersInfo]);

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
        <h5 className={classes.title}>{group?.group_title}</h5>
        <div className={classes.subTitle}>Team Name</div>
        <PageTabs currentTab={tab} tabs={tabs} />
      </aside>
      <section>
        {tab === GroupAdminTab.MANAGE_USERS && <></>}
        {tab === GroupAdminTab.SEND_ACTIVATION_CODE && <></>}
        {tab === GroupAdminTab.SEND_NOTIFICATIONS && <></>}
        {tab === GroupAdminTab.EDIT_GROUP && <></>}
      </section>
    </div>
  );
};

export default GroupAdminBody;
