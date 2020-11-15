/**
 * JSS styles for the Day component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import { FontMixins } from '../../../styles/mixins';
import color from 'color';
import Colors from '../../../styles/colors';

export default {
  weekTotal: {
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
  miles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

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
    }
  },
  '@media screen and (max-width: 1250px)': {
    miles: {
      '& > p': {
        fontSize: 16
      }
    }
  }
};
