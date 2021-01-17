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
    ...FontMixins.robotoBold(),
    marginTop: 15,
    color: '#777'
  },
  text: {
    marginLeft: 15
  },
  '@media screen and (max-width: 1200px)': {
    text: {
      marginLeft: 10
    }
  }
};
