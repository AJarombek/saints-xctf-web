/**
 * JSS styles for the CurrentMember component.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';
import color from 'color';

export default {
  currentMember: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground,

    '& > .aj-outlined-button': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px',
    },
  },
  memberTypeTag: {
    fontSize: 14,
    marginLeft: 10,
    cursor: 'auto !important',
    backgroundColor: ({ user }: { user: string }): string =>
      user === 'admin' ? Colors.spotPaletteBrown : color(Colors.lightBackground).darken(0.05).hex(),
    color: ({ user }: { user: string }): string => (user === 'admin' ? '#FFF' : '#000'),
  },
  memberTypeContent: {
    ...FontMixins.robotoThin(),
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0',
  },
  name: {
    ...FontMixins.robotoSlab(),
    fontSize: 16,
    marginLeft: 15,
  },
  removeAction: {
    margin: '0 10px 0 auto',
  },
  '@media screen and (max-width: 450px)': {
    name: {
      fontSize: 14,
    },
    removeAction: {
      '& > button': {
        fontSize: 12,
      },
    },
  },
  '@media screen and (max-width: 390px)': {
    memberTypeContent: {
      fontSize: 12,
    },
  },
};
