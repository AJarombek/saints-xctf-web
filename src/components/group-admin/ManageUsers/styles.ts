/**
 * JSS styles for the ManageUsers component.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import Mixins from '../../../styles/mixins';

export default {
  manageUsers: {},
  title: {
    ...Mixins.formTitle(),
  },
  container: {
    ...Mixins.containerBackground(),
    fontSize: 22,
  },
  category: {
    ...Mixins.inputTitle(),
    fontSize: 18,
    marginBottom: 15,
  },
  '@media screen and (max-width: 1050px)': {
    title: {
      width: '100%',
    },
  },
  '@media screen and (max-width: 450px)': {
    title: {
      fontSize: 20,
    },
    category: {
      fontSize: 16,
    },
  },
  '@media screen and (max-width: 390px)': {
    title: {
      marginLeft: 15,
      width: 'auto',
    },
  },
};
