/**
 * JSS styles for the Flair component.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import Colors from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    flair: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '15px 0',

        '& > p': {
            textAlign: 'center',
            margin: '2px 0',
            color: Colors.sxctfRed,
            ...FontMixins.robotoSlabBold(),
            fontSize: 13
        }
    }
};
