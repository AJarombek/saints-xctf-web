/**
 * JSS styles for the GroupAdminBody component.
 * @author Andrew Jarombek
 * @since 1/16/2021
 */

import Mixins, { AJComponentMixins, FontMixins } from '../../../styles/mixins';

export default {
  groupAdminBody: {
    ...Mixins.profileAndGroupBody(),

    '& > aside > .tabs': {
      width: 200
    }
  },
  mobileTabs: {
    display: 'none'
  },
  select: {
    ...AJComponentMixins.ajSelect()
  },
  title: {
    ...FontMixins.robotoSlabBold(),
    fontSize: 20,
    marginTop: 30
  },
  subTitle: {
    ...FontMixins.robotoBold(),
    marginTop: 15,
    color: '#777'
  },
  text: {
    marginLeft: 15
  },
  '@media screen and (max-width: 1200px)': {
    text: {
      marginLeft: 10
    }
  },
  '@media screen and (max-width: 900px)': {
    groupAdminBody: {
      '& > section': {
        margin: 0
      }
    }
  },
  '@media screen and (max-width: 750px)': {
    groupAdminBody: {
      flexDirection: 'column',

      '& > aside': {
        display: 'flex'
      },

      '& > div:nth-child(1)': {
        flexBasis: '30%'
      },

      '& .tabs': {
        display: 'none'
      }
    },
    mobileTabs: {
      ...Mixins.profileAndGroupMobileTabs(),
      margin: '0 0 0 30px'
    },
    select: {
      width: '100%'
    }
  }
};
