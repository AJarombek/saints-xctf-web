/**
 * JSS styles for the ProfileBody component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Mixins, { AJComponentMixins } from '../../../styles/mixins';

export default {
  container: {
    ...Mixins.profileAndGroupBody()
  },
  mobileTabs: {
    display: 'none'
  },
  select: {
    ...AJComponentMixins.ajSelect()
  },
  '@media screen and (max-width: 1200px)': {
    container: {
      ...Mixins.profileAndGroupBodyDesktopMedium()
    }
  },
  '@media screen and (max-width: 900px)': {
    container: {
      ...Mixins.profileAndGroupBodyDesktopSmall()
    }
  },
  '@media screen and (max-width: 750px)': {
    container: {
      ...Mixins.profileAndGroupBodyTablet()
    },
    mobileTabs: {
      ...Mixins.profileAndGroupMobileTabs()
    },
    select: {
      width: '100%'
    }
  },
  '@media screen and (max-width: 490px)': {
    container: {
      ...Mixins.profileAndGroupBodyMobile()
    }
  },
  '@media screen and (max-width: 390px)': {
    container: {
      ...Mixins.defaultBodyMobile()
    }
  }
};
