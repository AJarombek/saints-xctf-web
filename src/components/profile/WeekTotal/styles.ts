/**
 * JSS styles for the Day component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import {FontMixins} from "../../../styles/mixins";

export default {
    weekTotal: {
        position: 'relative',
        width: `${(1 / 8) * 100}%`,
        border: '1px solid',

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
    miles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        '& > p': {
            ...FontMixins.robotoSlab(),
            margin: 0,
            textAlign: 'center'
        }
    }
};
