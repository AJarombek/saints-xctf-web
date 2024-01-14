import { FontMixins } from '../../../styles/mixins';
import { Modules } from '../../../styles/modules';

/**
 * JSS styles for the WeeklyChart component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

export default {
  weeklyChart: {},
  ...Modules.filters(),
  chart: {
    ...FontMixins.robotoSlabThin(),
  },
  '@media screen and (max-width: 500px)': {
    filters: {
      marginBottom: 20,
    },
  },
};
