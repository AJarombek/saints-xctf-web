/**
 * JSS styles for the ForgotPasswordBody component.
 * @author Andrew Jarombek
 * @since 2/4/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  checkedIcon: {
    '& > p': {
      ...FontMixins.elegantIcons(),
      margin: 0
    }
  },
  enterCode: {
    ...Mixins.blueLink()
  }
};
