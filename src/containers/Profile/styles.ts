/**
 * JSS styles for the Profile component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';

export default {
  profile: {
    backgroundColor: Colors.lightBackground,
    ...Mixins.lightNavDarkDropdown(),

    '& .sxctf-home-footer': {
      backgroundColor: Colors.lightBackground
    }
  }
};
