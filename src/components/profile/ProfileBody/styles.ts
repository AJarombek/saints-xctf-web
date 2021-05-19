/**
 * JSS styles for the ProfileBody component.
 * @author Andrew Jarombek
 * @since 9/7/2020
 */

import Mixins, { AJComponentMixins } from '../../../styles/mixins';

export default {
  container: {
    ...Mixins.profileAndGroupBody()
  },
  mobileTabs: {
    display: 'none'
  },
  select: {
    ...AJComponentMixins.ajSelect()
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
  },
  '@media screen and (max-width: 750px)': {
    container: {
      flexDirection: 'column',

      '& > aside': {
        display: 'flex',
        marginRight: 0,
        marginBottom: 20
      },

      '& .pictureTitleContainer': {
        flexBasis: '30%'
      },

      '& .flairList, & .memberships, & .tabs': {
        display: 'none'
      }
    },
    mobileTabs: {
      display: 'flex',
      flexBasis: '70%',
      alignItems: 'flex-end',
      margin: 30
    },
    select: {
      width: '100%'
    }
  },
  '@media screen and (max-width: 490px)': {
    container: {
      '& .pictureTitleContainer > figure': {
        width: 100,
        height: 100,
        marginBottom: 10
      },

      '& .pictureTitleContainer > h5': {
        fontSize: 18
      },

      '& .pictureTitleContainer > div': {
        fontSize: 14
      }
    }
  },
  '@media screen and (max-width: 390px)': {
    container: {
      margin: '75px 0 0 0',
      minHeight: 'calc(100vh - 75px)'
    }
  }
};
