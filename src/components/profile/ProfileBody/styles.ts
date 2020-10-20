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
        margin: '100px 4% 0 4%',
        display: 'flex',

        '& > aside': {
            flexBasis: '20%',
            marginRight: 40
        },

        '& > section': {
            flexBasis: '80%',
            margin: '0 20px'
        }
    },
    '@media screen and (max-width: 1200px)': {
        container: {
            margin: '100px 6% 0 2%',

            '& > aside': {
                flexBasis: '30%',
                marginRight: 20
            },

            '& > section': {
                flexBasis: '70%',
                margin: 0
            }
        }
    },
    '@media screen and (max-width: 900px)': {
        container: {
            margin: '100px 2% 0 2%',
        }
    },
};
