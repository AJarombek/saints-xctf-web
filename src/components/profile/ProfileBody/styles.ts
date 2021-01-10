/**
 * JSS styles for the ProfileBody component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Mixins from '../../../styles/mixins';

export default {
  container: {
    ...Mixins.profileAndGroupBody()
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
      margin: '100px 2% 0 2%'
    }
  }
};
