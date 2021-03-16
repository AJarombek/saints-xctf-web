/**
 * JSS styles for the RegisterComplete component.
 * @author Andrew Jarombek
 * @since 2/23/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  registerComplete: {},
  checkedIcon: {
    ...Mixins.checkedIcon()
  },
  successDescription: {
    ...Mixins.successDescription(),
    ...FontMixins.robotoSlab()
  },
  signInLink: {
    ...Mixins.blueLink()
  }
};
