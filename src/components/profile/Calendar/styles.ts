/**
 * JSS styles for the Calendar component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  calendar: {
    maxWidth: 850,
    margin: '0 auto'
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
      margin: '20px 0'
    },

    '& > h2': {
      ...FontMixins.robotoSlab(),
      textAlign: 'center',
      width: '90%'
    }
  },
  weekdays: {
    display: 'flex',

    '& > p': {
      width: `${(1 / 8) * 100}%`,
      ...FontMixins.robotoBold(),
      textAlign: 'center',
      fontSize: 12,
      margin: 0,
      paddingBottom: 4
    }
  }
};
