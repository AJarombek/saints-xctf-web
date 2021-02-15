/**
 * Component for the body of the user profile page.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import PictureTitle from '../../shared/PictureTitle/PictureTitle';
import Flair from '../Flair/Flair';
import Memberships from '../Memberships/Memberships';
import PageTabs from '../../shared/PageTabs/PageTabs';
import {
  FlairMeta,
  LogFeeds,
  RangeViewExerciseTypeFilters,
  RootState,
  UserMeta,
  Users,
  StatsMeta
} from '../../../redux/types';
import PaginationBar from '../../shared/PaginationBar/PaginationBar';
import LogFeed from '../../shared/LogFeed/LogFeed';
import MonthlyCalendar from '../MonthlyCalendar';
import { logFeed } from '../../../redux/modules/logs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFlair, getUserMemberships } from '../../../redux/modules/profile';
import WeeklyChart from '../WeeklyChart';
import ProfileDetails from '../ProfileDetails';
import EditProfile from '../EditProfile';

interface Props {
  user: UserMeta;
  signedInUser: UserMeta;
  flair: FlairMeta;
  stats: StatsMeta;
  rangeViews: RangeViewExerciseTypeFilters;
}

export enum ProfileTab {
  LOGS,
  CALENDAR,
  CHART,
  DETAILS,
  EDIT
}

const useStyles = createUseStyles(styles);

const ProfileBody: React.FunctionComponent<Props> = ({ user, signedInUser, flair, stats, rangeViews }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userProfiles: Users = useSelector((state: RootState) => state.profile.users);
  const logFeeds: LogFeeds = useSelector((state: RootState) => state.logs.feeds);

  const [tab, setTab] = useState<ProfileTab>(ProfileTab.LOGS);
  const [bucket, setBucket] = useState<string>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (bucket) {
      dispatch(logFeed('user', bucket, 10, 10 * (page - 1)));
    }
  }, [bucket, page, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.username !== bucket) {
        setBucket(user.username);
      }

      if (!userProfiles[user.username]?.memberships && user.username) {
        dispatch(getUserMemberships(user.username));
      }

      if (!flair && user.username) {
        dispatch(getUserFlair(user.username));
      }
    }
  }, [user, userProfiles, flair, bucket, dispatch]);

  const totalPages: number = useMemo(() => {
    return logFeeds[`user-${bucket}`]?.pages[page]?.pages ?? 0;
  }, [logFeeds, page, bucket]);

  const tabs = useMemo(() => {
    const defaultTabs = [
      { tab: ProfileTab.LOGS, onView: (): void => setTab(ProfileTab.LOGS), content: 'Exercise Logs' },
      {
        tab: ProfileTab.CALENDAR,
        onView: (): void => setTab(ProfileTab.CALENDAR),
        content: 'Monthly Calendar'
      },
      { tab: ProfileTab.CHART, onView: (): void => setTab(ProfileTab.CHART), content: 'Weekly Chart' },
      { tab: ProfileTab.DETAILS, onView: (): void => setTab(ProfileTab.DETAILS), content: 'Details' }
    ];

    if (signedInUser && user?.username === signedInUser.username) {
      defaultTabs.push({ tab: ProfileTab.EDIT, onView: (): void => setTab(ProfileTab.EDIT), content: 'Edit Profile' });
    }

    return defaultTabs;
  }, [user, signedInUser]);

  if (user) {
    return (
      <div className={classes.container}>
        <aside>
          <PictureTitle
            imageUrl={
              user?.profilepic_name
                ? `/uasset/profile/${user?.username}/${user?.profilepic_name}`
                : '/asset/saintsxctf.png'
            }
            title={`${user?.first} ${user?.last}`}
            subTitle={`@${user?.username}`}
          />
          <Flair flair={flair} />
          <Memberships teamMemberships={userProfiles[user.username]?.memberships} />
          <PageTabs currentTab={tab} tabs={tabs} />
        </aside>
        <section>
          {tab === ProfileTab.LOGS && (
            <>
              <LogFeed logFeeds={logFeeds} page={page} user={signedInUser} filterBy="user" bucket={bucket} />
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
          {tab === ProfileTab.CALENDAR && <MonthlyCalendar rangeViews={rangeViews} user={user} />}
          {tab === ProfileTab.CHART && <WeeklyChart rangeViews={rangeViews} user={user} />}
          {tab === ProfileTab.DETAILS && <ProfileDetails user={user} stats={stats} />}
          {tab === ProfileTab.EDIT && user?.username === signedInUser?.username && <EditProfile user={user} />}
        </section>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileBody;
