/**
 * JSS styles for the DashboardBody component.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import Colors from "../../../styles/colors";

export default {
    dashboardBody: {
        display: 'grid',
        gridTemplateAreas: '"panel feed"',
        gridTemplateColumns: '1fr 2fr',
        minHeight: 'calc(100vh - 100px)',
        backgroundColor: Colors.lightBackground,
    },
    sidePanel: {
        gridArea: 'panel'
    },
    mainPanel: {
        gridArea: 'feed'
    }
};
