/**
 * JSS styles for the DefaultErrorPopup component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Mixins, { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  emailLink: {
    ...Mixins.saintsXCTFLink()
  },
  retry: {
    ...FontMixins.robotoSlabBold(),
    margin: '10px 0 0 5px',
    color: Colors.spotPaletteBlue,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
};
