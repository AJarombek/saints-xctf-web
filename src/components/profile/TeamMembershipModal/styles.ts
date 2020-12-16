/**
 * JSS styles for the TeamMembershipsModal component.
 * @author Andrew Jarombek
 * @since 12/14/2020
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  body: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 40px'
  },
  title: {
    display: 'flex',

    '& > p': {
      ...FontMixins.robotoSlab(),

      '& b': {
        ...FontMixins.robotoSlabBold()
      }
    }
  },
  buttons: {
    ...Mixins.modalButtons(),

    '& > .aj-contained-button': {
      marginRight: 10
    }
  }
};
