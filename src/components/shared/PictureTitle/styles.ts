/**
 * JSS styles for the PictureTitle component.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import Colors from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        backgroundColor: Colors.spotPaletteCream,
        border: '3px solid #888',
        transition: 'border 0.5s ease',

        '&:hover': {
            border: '3px solid #333'
        },

        '& > img': {
            width: '100%',
            height: '100%',
            borderRadius: '50%'
        }
    },
    title: {
        ...FontMixins.robotoSlabBold(),
        fontSize: 20
    },
    subTitle: {
        ...FontMixins.robotoBold()
    }
};
