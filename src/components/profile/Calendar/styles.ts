/**
 * JSS styles for the Calendar component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  calendar: {
    maxWidth: 800,
    margin: '0 auto',
  },
  monthNavigation: {
    display: 'flex',
    alignItems: 'center',

    '& > p': {
      ...FontMixins.elegantIcons(),
      fontSize: '42px',
      textAlign: 'center',
      width: '5%',
      cursor: 'pointer',
      margin: '20px 0',
    },

    '& > h2': {
      ...FontMixins.robotoSlab(),
      textAlign: 'center',
      width: '90%',
    },
  },
  weekdays: {
    display: 'flex',

    '& > div': {
      width: `${(1 / 8) * 100}%`,
      margin: 0,

      '& > p': {
        ...FontMixins.robotoBold(),
        textAlign: 'center',
        fontSize: 12,
        margin: 0,
        paddingBottom: 4,
      },
    },
  },
  weekdaysLong: {
    display: 'block',
  },
  weekdaysShort: {
    display: 'none',
  },
  '@media screen and (max-width: 650px)': {
    monthNavigation: {
      '& > p': {
        width: '10%',
      },

      '& > h2': {
        width: '80%',
      },
    },
  },
  '@media screen and (max-width: 550px)': {
    weekdaysLong: {
      display: 'none',
    },
    weekdaysShort: {
      display: 'block',
    },
  },
  '@media screen and (max-width: 390px)': {
    monthNavigation: {
      '& > p': {
        fontSize: 36,
      },

      '& > h2': {
        fontSize: 20,
      },
    },
  },
};
