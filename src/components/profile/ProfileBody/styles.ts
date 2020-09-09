/**
 * JSS styles for the ProfileBody component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Colors from "../../../styles/colors";

export default {
    container: {
        minHeight: 'calc(100vh - 100px)',
        backgroundColor: Colors.lightBackground,
        margin: '100px 6% 0 6%',
        display: 'flex',

        '& > aside': {
            flexBasis: '30%'
        },

        '& > section': {
            flexBasis: '70%'
        }
    }
};
