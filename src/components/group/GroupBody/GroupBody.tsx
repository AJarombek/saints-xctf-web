/**
 * GroupBody component which shows logs, statistics, and other details about a group.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import { GroupMeta, LogFeeds, RootState, User } from '../../../redux/types';
import PageTabs from '../../shared/PageTabs';
import PictureTitle from '../../shared/PictureTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../../redux/modules/groups';
import { useRouteMatch } from 'react-router-dom';
import LogFeed from '../../shared/LogFeed';
import PaginationBar from '../../shared/PaginationBar';
import { logFeed } from '../../../redux/modules/logs';

interface Props {
  user: User;
  group: GroupMeta;
}

export enum GroupTab {
  LOGS,
  MEMBERS,
  LEADERBOARD,
  DETAILS
}

const useStyles = createUseStyles(styles);

const GroupBody: React.FunctionComponent<Props> = ({ user, group }) => {
  const routeMatch = useRouteMatch();
  const classes = useStyles();

  const dispatch = useDispatch();
  const logFeeds: LogFeeds = useSelector((state: RootState) => state.logs.feeds);

  const [tab, setTab] = useState<GroupTab>(GroupTab.LOGS);
  const [bucket, setBucket] = useState<string>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const { id: groupId } = routeMatch.params;

    if (!group) {
      dispatch(getGroup(groupId));
    } else {
      setBucket(groupId);
    }
  }, [routeMatch.params, group, dispatch]);

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
      { tab: GroupTab.DETAILS, onView: (): void => setTab(GroupTab.DETAILS), content: 'Details' }
    ],
    []
  );

  return (
    <div className={classes.groupBody}>
      <aside>
        <PictureTitle
          imageUrl={
            group?.grouppic_name
              ? `/uasset/group/${group?.group_name}/${group?.grouppic_name}`
              : '/asset/saintsxctf.png'
          }
          title={group?.group_title}
          subTitle={'Members: 0'}
        />
        <PageTabs currentTab={tab} tabs={tabs} />
      </aside>
      <section>
        {tab === GroupTab.LOGS && (
          <>
            <LogFeed logFeeds={logFeeds} page={page} user={user} filterBy="user" bucket={bucket} />
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
        {tab === GroupTab.MEMBERS && <></>}
        {tab === GroupTab.LEADERBOARD && <></>}
        {tab === GroupTab.DETAILS && <></>}
      </section>
    </div>
  );
};

export default GroupBody;
