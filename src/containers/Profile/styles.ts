/**
 * JSS styles for the Profile component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Mixins from '../../styles/mixins';
import Colors from '../../styles/colors';

export default {
  profile: {
    ...Mixins.defaultPage()
  },
  emptyContainer: {
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: Colors.lightBackground
  }
};
