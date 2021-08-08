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
    width: '25%',
    ...FontMixins.robotoSlab(),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    margin: '13px 10px 13px 0'
  },
  bar: {
    width: '75%',
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
    borderRadius: '0 5px 5px 0',

    '& > p': {
      ...FontMixins.robotoBold(),
      marginRight: 10
    }
  },
  textInner: {
    color: 'white'
  },
  textAfter: {
    position: 'absolute',
    left: '100%',
    paddingLeft: 10,
    color: '#555'
  },
  '@media screen and (max-width: 550px)': {
    itemName: {
      fontSize: 14
    },
    textInner: {
      fontSize: 14
    },
    textAfter: {
      fontSize: 14
    }
  },
  '@media screen and (max-width: 500px)': {
    itemName: {
      width: '30%'
    },
    bar: {
      width: '70%'
    }
  },
  '@media screen and (max-width: 450px)': {
    textInner: {
      fontSize: 13
    },
    textAfter: {
      fontSize: 13
    }
  },
  '@media screen and (max-width: 390px)': {
    itemName: {
      fontSize: 13
    }
  },
  // Media query specific to Safari.
  // https://www.ryadel.com/en/css3-media-query-target-only-ie-ie6-ie11-firefox-chrome-safari-edge/#Safari_101
  '@media not all and (min-resolution:.001dpcm)': {
    '@media': {
      textAfter: {
        top: 0
      }
    }
  }
};
