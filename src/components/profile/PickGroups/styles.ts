/**
 * JSS styles for the PickGroups component.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  pickGroups: {},
  showMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',

    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },

    '& > div > p': {
      color: Colors.spotPaletteBlue,
      margin: 0,
    },

    '& > div > p:nth-child(1)': {
      ...FontMixins.elegantIcons(),
      marginTop: 4,
      marginRight: 8,
    },

    '& > div > p:nth-child(2)': {
      ...FontMixins.roboto(),
    },
  },
  '@media screen and (max-width: 580px)': {
    showMore: {
      fontSize: 14,
    },
  },
};
