/**
 * JSS styles for the DashboardSidePanel component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import Colors from "../../../styles/colors";
import color from "color";
import {FontMixins} from "../../../styles/mixins";

export default {
    dashboardSidePanel: {
        '& > div:nth-child(odd)': {
            backgroundColor: color(Colors.spotPaletteCream).lighten(0.05).hex()
        },

        '& > div:nth-child(even)': {
            backgroundColor: color(Colors.spotPaletteBrown).lighten(0.85).hex()
        }
    },
    groupMembership: {
        padding: '10px 10px 10px 20px',

        '& > a': {
            ...FontMixins.robotoSlab(),
            fontSize: '14px',
            margin: 0,
        }
    },
    oddMember: {
        backgroundColor: '#f1f1f1'
    },
    evenMember: {
        backgroundColor: '#f8f8f8'
    }
};
