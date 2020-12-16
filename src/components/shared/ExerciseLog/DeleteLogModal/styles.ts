/**
 * JSS styles for the DeleteLogModal component.
 * @author Andrew Jarombek
 * @since 12/15/2020
 */

import Mixins, { FontMixins } from '../../../../styles/mixins';
import color from 'color';
import Colors from '../../../../styles/colors';

export default {
  deleteModal: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 40px',

    '& > p': {
      ...FontMixins.robotoSlab(),

      '& b': {
        ...FontMixins.robotoSlabBold()
      }
    }
  },
  deleteModalButtons: {
    ...Mixins.modalButtons(),

    '& > .aj-contained-button': {
      marginRight: 10
    }
  },
  disabledDeleteButton: {
    backgroundColor: '#e6e6e6 !important',

    '& p': {
      color: '#555'
    }
  },
  deleteLogSpinner: {
    marginLeft: 25,
    marginRight: 10,

    '&:before': {
      border: `solid 4px ${color(Colors.spotPaletteBrown).lighten(0.75).hex()}`,
      borderTopColor: Colors.spotPaletteBrown
    }
  }
};
