/**
 * JSS styles for the NewLogBody component.
 * @author Andrew Jarombek
 * @since 8/16/2020
 */

import Colors, {FeelColors} from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    newLogBody: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 100px)',
        backgroundColor: Colors.lightBackground,
        margin: '100px 6% 0 6%',
    },
    title: {
        ...FontMixins.robotoSlabBold(),
        marginTop: '50px',
        fontSize: '24px',
        color: '#333'
    },
    logForm: {
        backgroundColor: ({feel}: {feel: number}) => FeelColors[feel],
        width: '100%',
        maxWidth: '700px',
        margin: '25px auto',
        borderRadius: '6px',
        padding: '20px'
    },
    feel: {
        ...FontMixins.roboto(),
        color: '#737373',
        margin: 0,
        textAlign: 'right'
    },
    inputTitle: {
        ...FontMixins.robotoSlabBold(),
        fontSize: '16px',
        color: Colors.spotPaletteBrown
    },
    nameBody: {
        '& .sxctf-image-input': {
            width: '100%'
        }
    },
    twoInputs: {
        display: 'flex'
    },
    locationInput: {
        flexBasis: '50%',

        '& .sxctf-image-input': {
            width: '100%'
        }
    },
    dateInput: {
        flexBasis: '50%',
        
        '& .sxctf-image-input': {
            width: '100%'
        }
    },
    select: {

    }
}
