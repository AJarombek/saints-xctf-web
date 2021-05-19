/**
 * JSS styles for the Day component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors, { FeelColors } from '../../../styles/colors';
import color from 'color';

// A long trek, but in case you are interested.  I run at 8am.
// https://www.nyrr.org/Races/NYRRWashingtonHeightsMile

export default {
  day: {
    position: 'relative',
    width: `${(1 / 8) * 100}%`,
    border: '1px solid #555',
    backgroundColor: color(Colors.lightBackground).darken(0.05).hex(),

    '&:before': {
      content: '" "',
      display: 'block',
      width: '100%',
      paddingTop: '100%'
    },

    '& > div': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  feel: {
    backgroundColor: ({ feel }: { feel: number }): string => FeelColors[feel - 1]
  },
  currentMonth: {
    backgroundColor: Colors.lightestBackground
  },
  dayOfMonth: {
    ...FontMixins.robotoSlabBold(),
    margin: 0,
    textAlign: 'start',
    padding: 4,
    fontSize: 20
  },
  miles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,

    '& > p': {
      ...FontMixins.robotoSlab(),
      margin: 0,
      textAlign: 'center',
      fontSize: 18
    }
  },
  '@media screen and (max-width: 1350px)': {
    miles: {
      '& > p': {
        fontSize: 17
      }
    },
    dayOfMonth: {
      fontSize: 18
    }
  },
  '@media screen and (max-width: 1250px)': {
    miles: {
      '& > p': {
        fontSize: 16
      }
    },
    dayOfMonth: {
      fontSize: 17
    }
  },
  '@media screen and (max-width: 1150px)': {
    miles: {
      '& > p': {
        fontSize: 15
      }
    },
    dayOfMonth: {
      fontSize: 16
    }
  },
  '@media screen and (max-width: 1050px)': {
    miles: {
      '& > p': {
        fontSize: 14
      }
    },
    dayOfMonth: {
      fontSize: 15
    }
  },
  '@media screen and (max-width: 950px)': {
    dayOfMonth: {
      fontSize: 14
    }
  },
  '@media screen and (max-width: 900px)': {
    miles: {
      '& > p': {
        fontSize: 13
      }
    }
  },
  '@media screen and (max-width: 650px)': {
    miles: {
      '& > p:nth-child(1)': {
        paddingTop: 12
      }
    }
  },
  '@media screen and (max-width: 550px)': {
    miles: {
      '& > p': {
        fontSize: 12
      }
    },
    dayOfMonth: {
      fontSize: 12
    }
  },
  '@media screen and (max-width: 450px)': {
    dayOfMonth: {
      fontSize: 10
    }
  }
};
