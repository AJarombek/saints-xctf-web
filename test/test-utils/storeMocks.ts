/**
 * Mocked redux stores used in tests.
 * @author Andrew Jarombek
 * @since 3/3/2021
 */

export const emptyStore = {
  auth: {
    auth: {},
    user: {},
    createActivationCode: {},
    emailActivationCode: {},
    createForgotPasswordCode: {},
    validateForgotPasswordCode: {},
    changePassword: {}
  },
  logs: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: {},
    feeds: {},
    newLog: {},
    updateLogs: {},
    deletedLogs: {},
    newComments: {}
  },
  memberships: {
    groups: {},
    updateMemberships: {},
    deleteMemberships: {}
  },
  notifications: {
    newNotification: {},
    updateNotifications: {}
  },
  profile: {
    users: {}
  },
  rangeView: {
    users: {},
    groups: {}
  },
  registration: {},
  teams: {
    team: {},
    search: {}
  },
  groups: {
    group: {},
    members: {},
    stats: {},
    leaderboards: {},
    team: {},
    uploadingGroupPicture: {},
    updating: {}
  }
};
