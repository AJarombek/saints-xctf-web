/**
 * JSS styles for the Day component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import {FontMixins} from "../../../styles/mixins";
import Colors from "../../../styles/colors";
import color from "color";

export default {
    day: {
        position: 'relative',
        width: `${(1 / 8) * 100}%`,
        border: '1px solid #555',
        backgroundColor: color(Colors.lightBackground).darken(0.05).hex(),

        '&:before': {
            content: '" "',
            display: 'block',
            width: '100%',
            paddingTop: '100%'
        },

        '& > div': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    },
    currentMonth: {
        backgroundColor: Colors.lightestBackground,
    },
    dayOfMonth: {
        ...FontMixins.robotoSlabBold(),
        margin: 0,
        textAlign: 'end',
        padding: 4
    },
    miles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,

        '& > p': {
            ...FontMixins.robotoSlab(),
            margin: 0,
            textAlign: 'center'
        }
    }
};
