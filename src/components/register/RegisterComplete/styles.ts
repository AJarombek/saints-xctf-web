import Mixins from "../../../styles/mixins";

/**
 * JSS styles for the RegisterComplete component.
 * @author Andrew Jarombek
 * @since 2/23/2021
 */

export default {
  registerComplete: {},
  checkedIcon: {
    ...Mixins.checkedIcon()
  },
  successDescription: {
    ...Mixins.successDescription()
  },
  enterCode: {
    ...Mixins.blueLink()
  }
};
