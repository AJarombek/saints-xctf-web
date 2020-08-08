/**
 * JSS styles for the AlertPopup component.
 * @author Andrew Jarombek
 * @since 8/8/2020
 */

import {FontMixins} from "../../../styles/mixins";
import {AlertPopupType} from "./AlertPopup";
import Colors from "../../../styles/colors";

export default {
    alert: {
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '500px',
        backgroundColor: ({ type }: {type: AlertPopupType}) =>
            type === 'warning' ? Colors.statusWarning : Colors.statusFailure,
    },
    alertIcon: {
        ...FontMixins.elegantIcons()
    },
    closeIcon: {
        margin: '0 10px 0 auto'
    }
};
