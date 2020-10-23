/**
 * JSS styles for the Calendar component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import {FontMixins} from "../../../styles/mixins";

export default {
    calendar: {},
    weekdays: {
        display: 'flex',

        '& > p': {
            width: `${(1 / 8) * 100}%`,
            ...FontMixins.robotoBold(),
            textAlign: 'center',
            fontSize: 12,
            margin: 0,
            paddingBottom: 4
        }
    },
};
