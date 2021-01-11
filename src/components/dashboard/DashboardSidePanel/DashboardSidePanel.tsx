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
import { User, GroupMember, NotificationsState } from '../../../redux/types';
import { AJButton, AJNotificationCircle } from 'jarombek-react-components';
import classNames from 'classnames';

interface IProps {
  user: User;
  groupMemberships: GroupMember[];
  notificationInfo: NotificationsState;
}

const useStyles = createUseStyles(styles);

const DashboardSidePanel: React.FunctionComponent<IProps> = ({ user, groupMemberships, notificationInfo }) => {
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
      <Accordion id="groupsAccordion" iconNode={<p>&#xe026;</p>} title="Groups" expandable={true} defaultState={true}>
        <>
          {groupMemberships &&
            groupMemberships.map((group, index) => (
              <div
                className={classNames(
                  classes.groupMembership,
                  index % 2 ? classes.oddMember : classes.evenMember,
                  'groupMember'
                )}
                key={index}
              >
                <a href={`/group/${group.group_name}`}>{group.group_title}</a>
              </div>
            ))}
          {!groupMemberships?.length && (
            <div className={classes.noMemberships}>
              <p>You have no group memberships.</p>
              <AJButton type="contained" onClick={() => history.push(`/profile/${user.username}/edit`)}>
                Join Groups
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
          {!!notificationCount && notificationInfo.items.map((notification, index) => <div></div>)}
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
