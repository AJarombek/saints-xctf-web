/**
 * JSS styles for the Log component.
 * @author Andrew Jarombek
 * @since 2/17/2021
 */

import Mixins from '../../styles/mixins';

export default {
  log: {
    ...Mixins.defaultPage(),
  },
  logBody: {
    ...Mixins.defaultBody(),
  },
  loading: {
    ...Mixins.loadingContainer(),
  },
  '@media screen and (max-width: 390px)': {
    logBody: {
      ...Mixins.defaultBodyMobile(),
    },
  },
};
