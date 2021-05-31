/**
 * JSS styles for the PictureTitle component.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  picture: {
    ...Mixins.profilePicture()
  },
  title: {
    ...FontMixins.robotoSlabBold(),
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 4
  },
  subTitle: {
    ...FontMixins.robotoBold()
  }
};
