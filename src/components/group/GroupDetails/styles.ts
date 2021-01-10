/**
 * JSS styles for the GroupDetails component.
 * @author Andrew Jarombek
 * @since 1/9/2021
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  groupDetails: {
    marginTop: 40
  },
  description: {
    ...FontMixins.robotoThin()
  },
  statisticSections: {
    display: 'flex',
    flexBasis: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    borderTop: '1px dashed'
  }
};
