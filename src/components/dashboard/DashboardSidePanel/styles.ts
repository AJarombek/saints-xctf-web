/**
 * JSS styles for the DashboardSidePanel component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import Colors from '../../../styles/colors';
import color from 'color';
import { FontMixins } from '../../../styles/mixins';

export default {
  dashboardSidePanel: {
    '& > div:nth-child(odd)': {
      backgroundColor: color(Colors.spotPaletteCream).lighten(0.05).hex(),
    },

    '& > div:nth-child(even)': {
      backgroundColor: color(Colors.spotPaletteBrown).lighten(0.85).hex(),
    },
  },
  teamMembership: {
    '& > p': {
      ...FontMixins.robotoSlabThin(),
      fontSize: 13,
      margin: 0,
      backgroundColor: color(Colors.spotPaletteBrown).lighten(0.8).hex(),
      padding: 6,
    },
  },
  groupMembership: {
    padding: '10px 10px 10px 20px',

    '& > a': {
      ...FontMixins.robotoSlab(),
      fontSize: 14,
      margin: 0,
      color: '#444',
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  oddMember: {
    backgroundColor: '#f1f1f1',
  },
  evenMember: {
    backgroundColor: '#f8f8f8',
  },
  noMemberships: {
    padding: '10px 10px 10px 20px',

    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: '14px',
      margin: 0,
      color: '#444',
    },

    '& > .aj-contained-button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30px',
      width: '70%',
      marginTop: '15px',
      marginBottom: '10px',
      backgroundColor: `${Colors.spotPaletteBrown} !important`,
    },
  },
  notificationCount: {
    ...FontMixins.robotoBold(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '62px',
  },
  hasNotifications: {
    '& .aj-notification-circle': {
      backgroundColor: Colors.sxctfRed,
    },
  },
  noNotifications: {
    '& .aj-notification-circle': {
      backgroundColor: color(Colors.spotPaletteBrown).lighten(0.5).hex(),
      color: '#333',
    },
  },
  noNotificationsText: {
    padding: '10px 10px 10px 20px',

    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: '14px',
      margin: 0,
      color: '#444',
    },
  },
  /* Semi-quarantine before the VT ski trip starts today (semi because I'm gonna run at 5am when hopefully nobody is
  around).  Then I have covid test next Wednesday and hopefully all works out and we are all able to go. */
  notification: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',

    '& > p': {
      margin: 0,
    },

    '& > p:nth-child(1)': {
      ...FontMixins.roboto(),
      fontSize: 13,
      alignSelf: 'flex-end',
    },

    '& > p:nth-child(2)': {
      cursor: 'pointer',
      alignSelf: 'start',
      paddingTop: 5,

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  viewedNotificationText: {
    ...FontMixins.robotoSlabThin(),
    color: Colors.spotPaletteBrown,
  },
  notViewedNotificationText: {
    ...FontMixins.robotoSlab(),
    color: Colors.sxctfRed,
  },
};
