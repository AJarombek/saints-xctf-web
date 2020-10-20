/**
 * JSS styles for the NavBar component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import Colors from "../../../styles/colors";
import color from "color";

export default {
    sticky: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderBottom: `2px solid ${color(Colors.spotPaletteBrown).darken(0.2)}`
    },
    dry: {
        position: 'absolute'
    }
};
