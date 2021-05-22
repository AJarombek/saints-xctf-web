/**
 * JSS styles for the Leaderboard component.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import { Modules } from '../../../styles/modules';
import { AJComponentMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';
import color from 'color';

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
  barChart: {
    backgroundColor: color(Colors.lightBackground).darken(0.05).hex(),
    padding: 20,
    borderRadius: 6,
    marginTop: 10
  },
  alertMessage: {
    marginTop: 10,

    '& > div': {
      padding: '4px 0'
    }
  },
  '@media screen and (max-width: 390px)': {
    barChart: {
      padding: 10
    },
    interval: {
      marginLeft: 15
    }
  }
};
