/**
 * JSS styles for the ForgotPasswordBody component.
 * @author Andrew Jarombek
 * @since 2/4/2021
 */

import Mixins from '../../../styles/mixins';

export default {
  checkedIcon: {
    ...Mixins.checkedIcon(),
  },
  successDescription: {
    ...Mixins.successDescription(),
  },
  enterCode: {
    ...Mixins.blueLink(),
  },
  button: {
    '& p': {
      margin: '2px 0',
    },
  },
  buttonSpinner: {
    ...Mixins.buttonSpinner(),
  },
  disabledButton: {
    ...Mixins.disabledButton(),

    '& p': {
      color: '#eee',
    },
  },
};
