import { FontMixins } from '../../../styles/mixins';

/**
 * JSS styles for the WeeklyChart component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

export default {
  weeklyChart: {},
  filters: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterTitle: {
    ...FontMixins.robotoSlab(),
    margin: '30px 40px 30px 0'
  },
  '@media screen and (max-width: 900px)': {
    filterTitle: {
      margin: '20px 20px 20px 0'
    }
  },
  chart: {
    ...FontMixins.robotoSlabThin()
  }
};
