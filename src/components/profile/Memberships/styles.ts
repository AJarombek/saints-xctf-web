import Colors from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

/**
 * JSS styles for the Memberships component.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

export default {
    memberships: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '15px 0',

        '& > p': {
            textAlign: 'center',
            margin: '2px 0',
            color: '#333',
            ...FontMixins.robotoBold(),
            fontSize: 16
        }
    }
};
