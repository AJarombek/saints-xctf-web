/**
 * JSS styles for the GroupAdminBody component.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  groupAdminBody: {
    ...Mixins.profileAndGroupBody(),

    '& > aside > .tabs': {
      width: 200
    }
  },
  title: {
    ...FontMixins.robotoSlabBold(),
    fontSize: 20,
    marginTop: 30
  },
  subTitle: {
    ...FontMixins.robotoBold()
  },
  text: {
    marginLeft: 20
  }
};
