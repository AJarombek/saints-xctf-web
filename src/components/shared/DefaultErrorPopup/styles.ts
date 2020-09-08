/**
 * JSS styles for the DefaultErrorPopup component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Colors from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    emailLink: {
        ...FontMixins.robotoSlabBold(),
        textDecoration: 'none',
        color: '#777',
        transition: 'color 0.5s ease',

        '&:hover': {
            color: Colors.sxctfRed,
            textDecoration: 'underline'
        }
    }
};
