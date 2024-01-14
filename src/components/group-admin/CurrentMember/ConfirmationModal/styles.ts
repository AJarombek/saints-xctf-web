/**
 * JSS styles for the ConfirmationModal component.
 * @author Andrew Jarombek
 * @since 1/17/2020
 */

import Mixins from '../../../../styles/mixins';

export default {
  modal: {
    ...Mixins.modal(),
  },
  modalButtons: {
    ...Mixins.modalButtons(),

    '& > .aj-contained-button': {
      marginRight: 10,
    },
  },
  disabledButton: {
    ...Mixins.disabledButton(),
  },
  spinner: {
    ...Mixins.buttonSpinner(),
  },
};
