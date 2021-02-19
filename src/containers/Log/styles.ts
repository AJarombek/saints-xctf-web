/**
 * JSS styles for the Log component.
 * @author Andrew Jarombek
 * @since 2/17/2021
 */

import Mixins from '../../styles/mixins';

export default {
  log: {
    ...Mixins.defaultPage()
  },
  loading: {
    ...Mixins.loadingContainer()
  }
};
