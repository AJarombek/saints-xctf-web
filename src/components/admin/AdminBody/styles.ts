/**
 * JSS styles for the AdminBody component.
 * @author Andrew Jarombek
 * @since 1/15/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  adminBody: {
    ...Mixins.defaultBody(),
  },
  title: {
    ...Mixins.formTitle(),
    fontSize: 20,
  },
  container: {
    backgroundColor: '#E3E3E3',
    width: '100%',
    maxWidth: 700,
    margin: '25px auto',
    borderRadius: 6,
    padding: 20,
  },
  teamTitle: {
    ...FontMixins.robotoBold(),
    fontSize: 20,
  },
  groups: {
    marginTop: 25,
    marginBottom: 15,
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground,
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
  '@media screen and (max-width: 800px)': {
    container: {
      maxWidth: 'auto',
    },
    title: {
      width: '100%',
    },
  },
  '@media screen and (max-width: 550px)': {
    title: {
      fontSize: 18,
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
    adminBody: {
      ...Mixins.defaultBodyMobile(),
    },
    container: {
      padding: 15,
    },
    title: {
      marginLeft: 15,
    },
    teamTitle: {
      fontSize: 16,
    },
    groupTitle: {
      fontSize: 14,
    },
  },
};
