/**
 * JSS styles for the DeleteLogModal component.
 * @author Andrew Jarombek
 * @since 12/15/2020
 */

import { FontMixins } from '../../../../styles/mixins';
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
    display: 'flex',
    marginLeft: 'auto',
    marginTop: 20,

    '& button': {
      display: 'flex',
      alignItems: 'center'
    },

    '& > .aj-contained-button, & > .aj-outlined-button': {
      '& p': {
        margin: 0
      }
    },

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
