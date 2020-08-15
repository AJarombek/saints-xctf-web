/**
 * JSS styles for the DashboardFeed component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import Colors from "../../../styles/colors";

export default {
    dashboardFeed: {},
    loading: {
        width: 125,
        margin: '0 auto',

        '& .aj-loading-circle': {
            width: 30,
            height: 30,
            backgroundColor: Colors.sxctfRed
        }
    }
};
