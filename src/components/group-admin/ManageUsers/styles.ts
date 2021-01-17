/**
 * JSS styles for the ManageUsers component.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import Mixins from '../../../styles/mixins';

export default {
  manageUsers: {},
  title: {
    ...Mixins.formTitle()
  },
  container: {
    ...Mixins.containerBackground(),
    fontSize: 22
  },
  category: {
    ...Mixins.inputTitle(),
    fontSize: 18,
    marginBottom: 15
  }
};
