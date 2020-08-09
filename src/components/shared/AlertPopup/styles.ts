/**
 * JSS styles for the AlertPopup component.
 * @author Andrew Jarombek
 * @since 8/8/2020
 */

import {FontMixins} from "../../../styles/mixins";
import {AlertPopupType} from "./AlertPopup";
import Colors from "../../../styles/colors";
import color from "color";

export default {
    alertContainer: {
        display: 'flex',
        position: 'fixed',
        top: 100,
        left: 0,
        width: '100%',
        justifyContent: 'center'
    },
    alert: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        width: '500px',
        borderRadius: '3px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        backgroundColor: ({ type }: {type: AlertPopupType}) =>
            type === 'warning' ?
                color(Colors.statusWarning).lighten(0.65).hex() :
                type === 'info' ?
                    color(Colors.spotPaletteBlue).lighten(0.65).hex() :
                    color(Colors.statusFailure).lighten(0.65).hex(),
    },
    alertIcon: {
        ...FontMixins.elegantIcons(),
        fontSize: '28px',
        margin: '10px',
        color: ({ type }: {type: AlertPopupType}) =>
            type === 'warning' ? Colors.statusWarning : type === 'info' ? Colors.spotPaletteBlue : Colors.statusFailure,
    },
    message: {
        ...FontMixins.robotoBold(),
        fontSize: '16px',
        margin: 0
    },
    closeIcon: {
        ...FontMixins.elegantIcons(),
        fontSize: '24px',
        margin: '0 10px 0 auto',
        cursor: 'pointer'
    }
};
