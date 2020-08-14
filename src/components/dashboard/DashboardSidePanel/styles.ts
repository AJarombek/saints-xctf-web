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
            color: '#444',
            textDecoration: 'none',

            '&:hover': {
                textDecoration: 'underline'
            }
        }
    },
    oddMember: {
        backgroundColor: '#f1f1f1'
    },
    evenMember: {
        backgroundColor: '#f8f8f8'
    },
    noMemberships: {
        padding: '10px 10px 10px 20px',

        '& > p': {
            ...FontMixins.robotoSlab(),
            fontSize: '14px',
            margin: 0,
            color: '#444',
        },

        '& > .aj-contained-button': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            width: '60%',
            marginTop: '15px',
            marginBottom: '10px',
            backgroundColor: `${Colors.spotPaletteBrown} !important`,
        }
    }
};
