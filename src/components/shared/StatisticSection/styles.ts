/**
 * JSS styles for the StatisticsSection component.
 * @author Andrew Jarombek
 * @since 11/14/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  stats: {
    margin: '20px 25px',

    '& > h3': {
      ...FontMixins.robotoBold(),
      marginBottom: 10,
    },
  },
  section: {
    display: 'flex',

    '& > p': {
      margin: '4px 0',
    },

    '& > p:nth-child(1)': {
      ...FontMixins.robotoSlab(),
      width: 200,
    },

    '& > p:nth-child(2)': {
      ...FontMixins.robotoThin(),
      width: 125,
      textAlign: 'end',
    },
  },
  '@media screen and (max-width: 450px)': {
    stats: {
      '& > h3': {
        fontSize: 16,
      },
    },
    section: {
      '& > p': {
        fontSize: 14,
      },

      '& > p:nth-child(1)': {
        width: 160,
      },

      '& > p:nth-child(2)': {
        width: 100,
      },
    },
  },
};
