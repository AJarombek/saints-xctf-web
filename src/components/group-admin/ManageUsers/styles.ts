/**
 * JSS styles for the ManageUsers component.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import Mixins, {FontMixins} from '../../../styles/mixins';

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
    fontSize: 18
  },
  pendingUser: {
    display: 'flex',
    alignItems: 'center'
  },
  pendingUserActions: {
    margin: '0 10px 0 auto'
  },
  name: {
    ...FontMixins.robotoSlab()
  }
};
