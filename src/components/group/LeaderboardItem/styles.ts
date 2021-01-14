/**
 * JSS styles for the LeaderboardItem component.
 * @author Andrew Jarombek
 * @since 1/13/2021
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
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
    flexBasis: '20%',
    ...FontMixins.robotoSlab()
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
    width: ({ barWidth }: { barWidth: number }): string => `${barWidth}%`,

    '& > p': {
      ...FontMixins.robotoBold(),
      color: 'white',
      marginRight: 10
    }
  }
};
