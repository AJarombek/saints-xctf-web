/**
 * JSS styles for the ConfirmationModal component.
 * @author Andrew Jarombek
 * @since 1/17/2020
 */

import Mixins, { FontMixins } from '../../../../styles/mixins';

export default {
  modal: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 40px',

    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: 18,

      '& b': {
        ...FontMixins.robotoSlabBold()
      }
    }
  },
  modalButtons: {
    ...Mixins.modalButtons(),

    '& > .aj-contained-button': {
      marginRight: 10
    }
  },
  disabledButton: {
    ...Mixins.disabledButton()
  },
  spinner: {
    ...Mixins.buttonSpinner()
  }
};
