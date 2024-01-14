/**
 * GroupBody component which shows logs, statistics, and other details about a group.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import {
  GroupMeta,
  LogFeeds,
  MemberDetails,
  MemberDetailsMeta,
  RootState,
  StatsMeta,
  User,
} from '../../../redux/types';
import PageTabs from '../../shared/PageTabs';
import PictureTitle from '../../shared/PictureTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup, getGroupMembers } from '../../../redux/modules/groups';
import { useParams } from 'react-router-dom';
import LogFeed from '../../shared/LogFeed';
import PaginationBar from '../../shared/PaginationBar';
import { logFeed } from '../../../redux/modules/logs';
import GroupDetails from '../GroupDetails/GroupDetails';
import GroupMembers from '../GroupMembers';
import Leaderboard from '../Leaderboard';
import { AJSelect, AJTag } from 'jarombek-react-components';
import { Tab } from '../../shared/PageTabs/PageTabs';
import { ProfileTab } from '../../profile/ProfileBody/ProfileBody';

interface Props {
  user: User;
  group: GroupMeta;
}

export enum GroupTab {
  LOGS = 'logs',
  MEMBERS = 'members',
  LEADERBOARD = 'leaderboard',
  DETAILS = 'details',
}

const useStyles = createUseStyles(styles);

const GroupBody: React.FunctionComponent<Props> = ({ user, group }) => {
  const { id: groupId } = useParams();

  const dispatch = useDispatch();
  const logFeeds: LogFeeds = useSelector((state: RootState) => state.logs.feeds);
  const allStats: Record<string, StatsMeta> = useSelector((state: RootState) => state.groups.stats ?? {});
  const membersInfo = useSelector((state: RootState) => state.groups.members ?? {});

  const [tab, setTab] = useState<GroupTab>(GroupTab.LOGS);
  const [bucket, setBucket] = useState<string>(null);
  const [page, setPage] = useState(1);

  const allMembers = useMemo(() => {
    return membersInfo[groupId]?.items ?? [];
  }, [membersInfo, groupId]);

  const acceptedMembers = useMemo(() => {
    return allMembers.filter((member: MemberDetails) => member.status === 'accepted') ?? [];
  }, [allMembers]);

  const userMembership: { user?: string; status?: string } = useMemo(() => {
    const matchingMemberships = allMembers
      .filter((member) => member.username === user?.username)
      .map((member) => ({ user: member.user, status: member.status }));

    if (matchingMemberships.length) {
      return matchingMemberships[0];
    } else {
      return {};
    }
  }, [allMembers, user?.username]);

  const membershipTagText = useMemo(() => {
    if (userMembership.status === 'pending') {
      return 'Membership Pending';
    } else if (userMembership.status === 'accepted' && userMembership.user === 'user') {
      return 'Member';
    } else if (userMembership.status === 'accepted' && userMembership.user === 'admin') {
      return 'Administrator';
    } else {
      return 'Non-Member';
    }
  }, [userMembership.status, userMembership.user]);

  const classes = useStyles({ membershipTagText });

  useEffect(() => {
    if (!group && !group?.isFetching && !group?.serverError) {
      dispatch(getGroup(+groupId));
    } else {
      setBucket(groupId);
    }
  }, [groupId, group, dispatch]);

  useEffect(() => {
    const groupMembers: MemberDetailsMeta = membersInfo[groupId];
    if (!groupMembers?.items && !groupMembers?.isFetching && !groupMembers?.serverError) {
      dispatch(getGroupMembers(+groupId));
    }
  }, [dispatch, groupId, membersInfo]);

  useEffect(() => {
    if (bucket) {
      dispatch(logFeed('group', bucket, 10, 10 * (page - 1)));
    }
  }, [bucket, page, dispatch]);

  const totalPages: number = useMemo(() => {
    return logFeeds[`group-${bucket}`]?.pages[page]?.pages ?? 0;
  }, [logFeeds, page, bucket]);

  const tabs = useMemo(
    () => [
      { tab: GroupTab.LOGS, onView: (): void => setTab(GroupTab.LOGS), content: 'Exercise Logs' },
      { tab: GroupTab.MEMBERS, onView: (): void => setTab(GroupTab.MEMBERS), content: 'Members' },
      { tab: GroupTab.LEADERBOARD, onView: (): void => setTab(GroupTab.LEADERBOARD), content: 'Leaderboard' },
      { tab: GroupTab.DETAILS, onView: (): void => setTab(GroupTab.DETAILS), content: 'Details' },
    ],
    []
  );

  return (
    <div className={classes.groupBody}>
      <aside>
        <div>
          <PictureTitle
            imageUrl={
              group?.grouppic_name ? `/uasset/group/${group?.id}/${group?.grouppic_name}` : '/asset/saintsxctf.png'
            }
            title={group?.group_title}
            subTitle={`Members: ${acceptedMembers.length}`}
          />
          <div className={classes.membershipTagContainer} data-cypress="groupMembershipTag">
            <AJTag content={membershipTagText} className={classes.membershipTag} />
          </div>
        </div>
        <PageTabs currentTab={tab} tabs={tabs} />
        <div className={classes.mobileTabs}>
          <AJSelect
            options={...tabs.map((tab: Tab) => ({ content: tab.content, value: tab.tab }))}
            defaultOption={1}
            onClickListOption={(item: { content: string; value: string }): void => setTab(item.value as GroupTab)}
            className={classes.select}
          />
        </div>
      </aside>
      <section>
        {tab === GroupTab.LOGS && (
          <>
            <LogFeed logFeeds={logFeeds} page={page} user={user} filterBy="group" bucket={bucket} />
            <PaginationBar
              page={page}
              totalPages={totalPages}
              onChangePage={(page): void => {
                setPage(page);
                window.scrollTo(0, 0);
              }}
            />
          </>
        )}
        {tab === GroupTab.MEMBERS && <GroupMembers members={acceptedMembers} />}
        {tab === GroupTab.LEADERBOARD && <Leaderboard group={group} />}
        {tab === GroupTab.DETAILS && <GroupDetails group={group} stats={allStats[groupId]} />}
      </section>
    </div>
  );
};

export default GroupBody;
