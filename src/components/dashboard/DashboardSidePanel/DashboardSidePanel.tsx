/**
 * DashboardSidePanel component which shows links to other parts of the website.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './styles';
import Accordion from '../../shared/Accordion/Accordion';
import { useHistory } from 'react-router-dom';
import { User, NotificationsState, TeamMembership } from '../../../redux/types';
import { AJButton, AJNotificationCircle } from 'jarombek-react-components';
import classNames from 'classnames';
import moment from 'moment';

interface Props {
  user: User;
  teamMemberships: TeamMembership[];
  notificationInfo: NotificationsState;
}

const useStyles = createUseStyles(styles);

const DashboardSidePanel: React.FunctionComponent<Props> = ({ user, teamMemberships, notificationInfo }) => {
  const classes = useStyles();
  const history = useHistory();

  const notificationCount = useMemo(() => {
    return notificationInfo?.items?.length ?? 0;
  }, [notificationInfo]);

  return (
    <div id="dashboardSidePanel" className={classes.dashboardSidePanel}>
      <Accordion
        iconNode={<p>&#xe107;</p>}
        title="Profile"
        expandable={false}
        onClick={(): void => history.push(`/profile/${user.username}`)}
      />
      <Accordion
        iconNode={<p>&#x0050;</p>}
        title="Create New Log"
        expandable={false}
        onClick={(): void => history.push('/log/new')}
      />
      <Accordion
        id="groupsAccordion"
        iconNode={<p>&#xe026;</p>}
        title="Teams & Groups"
        expandable={true}
        defaultState={true}
      >
        <>
          {teamMemberships
            ?.filter((teamMembership) => teamMembership.groups.length)
            .map((teamMembership) => (
              <div className={classes.teamMembership}>
                <p>{teamMembership.title}</p>
                {teamMembership.groups.map((group, index) => (
                  <div
                    className={classNames(
                      classes.groupMembership,
                      index % 2 ? classes.oddMember : classes.evenMember,
                      'groupMember'
                    )}
                    key={index}
                  >
                    <a href={`/group/${group.group_id}`}>{group.group_title}</a>
                  </div>
                ))}
              </div>
            ))}
          {!teamMemberships?.filter((teamMembership) => teamMembership.groups.length)?.length && (
            <div className={classes.noMemberships}>
              <p>You have no team or group memberships.</p>
              <AJButton type="contained" onClick={(): void => history.push(`/profile/${user.username}/edit`)}>
                Join Teams & Groups
              </AJButton>
            </div>
          )}
        </>
      </Accordion>
      <Accordion
        iconNode={
          <div
            className={classNames(
              classes.notificationCount,
              notificationCount ? classes.hasNotifications : classes.noNotifications
            )}
          >
            <AJNotificationCircle count={notificationCount} />
          </div>
        }
        title="Notifications"
        expandable={true}
      >
        <>
          {notificationInfo.serverError && (
            <div>
              <p>&#x0062;</p>
              <p>An error occurred while loading notifications.</p>
            </div>
          )}
          {notificationInfo.isFetching && <div>Loading...</div>}
          {!!notificationCount &&
            notificationInfo.items.map((notification, index) => (
              <div
                key={index}
                className={classNames(classes.notification, index % 2 ? classes.oddMember : classes.evenMember)}
              >
                <p>{moment(notification.time).format('MMMM Do h:mm A')}</p>
                <p
                  className={notification.viewed ? classes.viewedNotificationText : classes.notViewedNotificationText}
                  onClick={(): void => history.push(notification.link)}
                >
                  {notification.description}
                </p>
              </div>
            ))}
          {!notificationCount && (
            <div className={classes.noNotificationsText}>
              <p>You have no notifications from the past 14 days.</p>
            </div>
          )}
        </>
      </Accordion>
    </div>
  );
};

export default DashboardSidePanel;
