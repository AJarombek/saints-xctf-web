/**
 * JSS styles for the ProfileDetails component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  profileDetails: {},
  profileDetail: {
    display: 'flex',

    '& > p': {
      margin: '4px 0'
    },

    '& > p:nth-child(1)': {
      marginRight: 5
    }
  },
  defaultText: {
    '& > p:nth-child(1)': {
      ...FontMixins.robotoSlab()
    },

    '& > p:nth-child(2)': {
      ...FontMixins.robotoThin()
    }
  },
  thin: {
    ...FontMixins.robotoThin()
  },
  normal: {
    ...FontMixins.robotoSlab()
  },
  strong: {
    ...FontMixins.robotoBold()
  },
  description: {
    marginTop: 15
  }
};
