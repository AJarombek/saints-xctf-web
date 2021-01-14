/**
 * JSS styles for the Leaderboard component.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import { Modules } from '../../../styles/modules';
import { AJComponentMixins } from '../../../styles/mixins';

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
  barChart: {}
};
