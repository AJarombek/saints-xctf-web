/**
 * JSS styles for the DashboardBody component.
 * @author Andrew Jarombek
 * @since 7/24/2020
 */

import Colors from '../../../styles/colors';

export default {
  dashboardBody: {
    display: 'grid',
    gridTemplateAreas: '"panel feed"',
    gridTemplateColumns: '1fr 2fr',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: Colors.lightBackground,
    margin: '100px 6% 0 6%'
  },
  sidePanel: {
    gridArea: 'panel',
    padding: 20
  },
  mainPanel: {
    gridArea: 'feed',
    padding: 20
  },
  '@media screen and (max-width: 1100px)': {
    dashboardBody: {
      margin: '100px 2% 0 2%'
    }
  },
  '@media screen and (max-width: 950px)': {
    dashboardBody: {
      margin: '100px 0 0 0'
    }
  },
  '@media screen and (max-width: 800px)': {
    dashboardBody: {
      display: 'flex'
    },
    sidePanel: {
      display: 'none'
    },
    mainPanel: {
      width: '100%'
    }
  },
  '@media screen and (max-width: 500px)': {
    mainPanel: {
      padding: 10
    }
  },
  '@media screen and (max-width: 390px)': {
    dashboardBody: {
      margin: '75px 0 0 0',
      minHeight: 'calc(100vh - 75px)'
    },
    mainPanel: {
      padding: 5
    }
  }
};
