/**
 * JSS styles for the SendActivationCode component.
 * @author Andrew Jarombek
 * @since 1/19/2021
 */

import Mixins from '../../../styles/mixins';

export default {
  sendActivationCode: {},
  container: {
    ...Mixins.containerBackground()
  },
  title: {
    ...Mixins.formTitle()
  },
  inputTitle: {
    ...Mixins.inputTitle()
  }
};
