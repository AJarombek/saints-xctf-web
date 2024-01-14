/**
 * JSS styles for the DeleteLogModal component.
 * @author Andrew Jarombek
 * @since 12/15/2020
 */

import Mixins, { FontMixins } from '../../../../styles/mixins';

export default {
  deleteModal: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 40px',

    '& > p': {
      ...FontMixins.robotoSlab(),

      '& b': {
        ...FontMixins.robotoSlabBold(),
      },
    },
  },
  deleteModalButtons: {
    ...Mixins.modalButtons(),

    '& > .aj-contained-button': {
      marginRight: 10,
    },
  },
  disabledDeleteButton: {
    ...Mixins.disabledButton(),
  },
  deleteLogSpinner: {
    ...Mixins.buttonSpinner(),
  },
};
