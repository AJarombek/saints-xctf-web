/**
 * JSS styles for the Leaderboard component.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import { Modules } from '../../../styles/modules';
import {AJComponentMixins, FontMixins} from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  leaderboard: {},
  ...Modules.filters(),
  interval: {
    marginTop: 40,
    width: 120
  },
  select: {
    ...AJComponentMixins.ajSelect()
  },
  barChart: {},
  leaderboardItem: {
    display: 'flex',
    alignContent: 'space-around',
    margin: '5px 0',

    '&:nth-child(odd) > div > div:last-child': {
      backgroundColor: Colors.sxctfRed
    },

    '&:nth-child(even) > div > div:last-child': {
      backgroundColor: Colors.spotPaletteBrown
    }
  },
  itemName: {
    flexBasis: '20%'
  },
  bar: {
    flexBasis: '80%',
    position: 'relative',

    '& > div': {
      position: 'absolute',
      height: '100%'
    }
  },
  barBackground: {
    backgroundColor: Colors.lightBackground,
    width: '100%'
  },
  barFill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& > p': {
      ...FontMixins.robotoBold(),
      color: 'white',
      marginRight: 10
    }
  }
};
