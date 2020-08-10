/**
 * JSS styles for the DashboardSidePanel component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import Colors from "../../../styles/colors";
import color from "color";

export default {
    dashboardSidePanel: {
        '& > div:nth-child(odd)': {
            backgroundColor: color(Colors.spotPaletteCream).lighten(0.05).hex()
        },

        '& > div:nth-child(even)': {
            backgroundColor: color(Colors.spotPaletteBrown).lighten(0.85).hex()
        }
    }
};
