/**
 * JSS styles for the TeamsBody component.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  teamsBody: {
    ...Mixins.defaultBody(),
  },
  title: {
    ...Mixins.formTitle(),
  },
  container: {
    ...Mixins.containerBackground(),
  },
  teamTitle: {
    ...FontMixins.robotoBold(),
    fontSize: 20,
  },
  groups: {
    marginTop: 20,
    marginBottom: 10,
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground,
    /* ❤️ */
    transition: 'background-color 0.5s ease, color 0.4s ease',

    '&:hover': {
      backgroundColor: Colors.spotPaletteBrown,
      color: Colors.lightestBackground,
    },
  },
  groupTitle: {
    ...FontMixins.roboto(),
    fontSize: 18,
    margin: 15,
  },
  alertMessage: {
    marginTop: 10,

    '& > div': {
      padding: '4px 0',
    },
  },
  '@media screen and (max-width: 550px)': {
    title: {
      fontSize: 20,
    },
    teamTitle: {
      fontSize: 18,
    },
    groupTitle: {
      fontSize: 16,
      margin: 12,
    },
  },
  '@media screen and (max-width: 390px)': {
    teamsBody: {
      ...Mixins.defaultBodyMobile(),
    },
    title: {
      marginLeft: 15,
    },
  },
};
