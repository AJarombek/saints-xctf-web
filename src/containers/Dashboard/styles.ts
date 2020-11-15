/**
 * JSS styles for the Dashboard component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';

export default {
  dashboard: {
    backgroundColor: Colors.lightBackground,
    ...Mixins.lightNavDarkDropdown(),

    '& .sxctf-home-footer': {
      backgroundColor: Colors.lightBackground
    }
  }
};
