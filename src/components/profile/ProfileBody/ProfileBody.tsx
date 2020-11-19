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
  UserStatsMeta
} from '../../../redux/types';
import PaginationBar from '../../shared/PaginationBar/PaginationBar';
import LogFeed from '../../shared/LogFeed/LogFeed';
import MonthlyCalendar from '../MonthlyCalendar';
import { logFeed } from '../../../redux/modules/logs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFlair } from '../../../redux/modules/profile';
import { getGroupMemberships } from '../../../redux/modules/memberships';
import WeeklyChart from '../WeeklyChart';
import ProfileDetails from '../ProfileDetails';
import EditProfile from "../EditProfile";

interface Props {
  user: UserMeta;
  flair: FlairMeta;
  stats: UserStatsMeta;
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

const ProfileBody: React.FunctionComponent<Props> = ({ user, flair, stats, rangeViews }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const groupMemberships = useSelector((state: RootState) => state.memberships.groups?.items);
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

      if (!groupMemberships) {
        dispatch(getGroupMemberships(user.username));
      }

      if (!flair) {
        dispatch(getUserFlair(user.username));
      }
    }
  }, [user, groupMemberships, flair, bucket, dispatch]);

  const totalPages: number = useMemo(() => {
    return logFeeds[`user-${bucket}`]?.pages[page]?.pages ?? 0;
  }, [logFeeds, page, bucket]);

  if (user) {
    return (
      <div className={classes.container}>
        <aside>
          <PictureTitle imageUrl={null} title={`${user?.first} ${user?.last}`} subTitle={`@${user?.username}`} />
          <Flair flair={flair} />
          <Memberships groupMemberships={groupMemberships} />
          <PageTabs
            currentTab={tab}
            viewExerciseLogs={(): void => setTab(ProfileTab.LOGS)}
            viewMonthlyCalendar={(): void => setTab(ProfileTab.CALENDAR)}
            viewWeeklyChart={(): void => setTab(ProfileTab.CHART)}
            viewDetails={(): void => setTab(ProfileTab.DETAILS)}
            viewEditProfile={(): void => setTab(ProfileTab.EDIT)}
          />
        </aside>
        <section>
          {tab === ProfileTab.LOGS && (
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
          {tab === ProfileTab.CALENDAR && <MonthlyCalendar rangeViews={rangeViews} user={user} />}
          {tab === ProfileTab.CHART && <WeeklyChart rangeViews={rangeViews} user={user} />}
          {tab === ProfileTab.DETAILS && <ProfileDetails user={user} stats={stats} />}
          {tab === ProfileTab.EDIT && <EditProfile user={user} />}
        </section>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileBody;
