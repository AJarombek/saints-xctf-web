/**
 * GroupAdminBody component which allows admins to manage users, notifications, and group information.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta, RootState, TeamMeta } from '../../../redux/types';
import PageTabs from '../../shared/PageTabs';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, getGroupTeam } from '../../../redux/modules/groups';
import classNames from 'classnames';
import ManageUsers from '../ManageUsers/ManageUsers';
import SendActivationCode from '../SendActivationCode';
import EditGroup from '../EditGroup';
import { AJSelect } from 'jarombek-react-components';
import { Tab } from '../../shared/PageTabs/PageTabs';
import { GroupTab } from '../../group/GroupBody/GroupBody';

interface Props {
  group: GroupMeta;
  groupId: number;
}

export enum GroupAdminTab {
  MANAGE_USERS = 'manage-users',
  SEND_ACTIVATION_CODE = 'send-activation-code',
  EDIT_GROUP = 'edit-group'
}

const useStyles = createUseStyles(styles);

const GroupAdminBody: React.FunctionComponent<Props> = ({ group, groupId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const teamInfo: Record<string, TeamMeta> = useSelector((state: RootState) => state.groups.team ?? {});

  const [tab, setTab] = useState<GroupAdminTab>(GroupAdminTab.MANAGE_USERS);

  useEffect(() => {
    if (!group) {
      dispatch(getGroup(+groupId));
    }
  }, [groupId, group, dispatch]);

  useEffect(() => {
    if (!teamInfo[groupId]) {
      dispatch(getGroupTeam(groupId));
    }
  }, [dispatch, groupId, teamInfo]);

  const teamTitle: string = useMemo(() => {
    return teamInfo[groupId]?.title;
  }, [groupId, teamInfo]);

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
      { tab: GroupAdminTab.EDIT_GROUP, onView: (): void => setTab(GroupAdminTab.EDIT_GROUP), content: 'Edit Group' }
    ],
    []
  );

  return (
    <div className={classes.groupAdminBody}>
      <aside>
        <div>
          <h5 className={classNames(classes.title, classes.text)}>{group?.group_title}</h5>
          <div className={classNames(classes.subTitle, classes.text)}>{teamTitle}</div>
        </div>
        <PageTabs currentTab={tab} tabs={tabs} />
        <div className={classes.mobileTabs}>
          <AJSelect
            options={...tabs.map((tab: Tab) => ({ content: tab.content, value: tab.tab }))}
            defaultOption={1}
            onClickListOption={(item: { content: string; value: string }): void => setTab(item.value as GroupAdminTab)}
            className={classNames(classes.select, 'mobileTabsSelect')}
          />
        </div>
      </aside>
      <section>
        {tab === GroupAdminTab.MANAGE_USERS && <ManageUsers groupId={groupId} />}
        {tab === GroupAdminTab.SEND_ACTIVATION_CODE && <SendActivationCode groupId={groupId} />}
        {tab === GroupAdminTab.EDIT_GROUP && <EditGroup group={group} />}
      </section>
    </div>
  );
};

export default GroupAdminBody;
