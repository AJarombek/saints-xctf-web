/**
 * JSS styles for the GroupBody component.
 * I'm sorry if my mind has been doubting your love which you have tried to show me.  It is difficult for me to know
 * what is best for me to do.  It is difficult for me to know how to best show my love.  I hope you know I'm trying
 * my best.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import Mixins, { AJComponentMixins, FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  groupBody: {
    ...Mixins.profileAndGroupBody(),
  },
  mobileTabs: {
    display: 'none',
  },
  select: {
    ...AJComponentMixins.ajSelect(),
  },
  membershipTagContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  membershipTag: {
    ...FontMixins.robotoSlabThin(),
    fontSize: 14,
    margin: '20px 0 10px 0',
    cursor: 'auto !important',
    padding: '2px 10px !important',
    backgroundColor: ({ membershipTagText }: { membershipTagText: string }): string =>
      membershipTagText === 'Administrator' || membershipTagText === 'Member'
        ? Colors.sxctfRed
        : membershipTagText === 'Membership Pending'
        ? Colors.spotPaletteBrown
        : Colors.lightestBackground,
    color: ({ membershipTagText }: { membershipTagText: string }): string =>
      membershipTagText === 'Non-Member' ? '#000' : '#FFF',
  },
  '@media screen and (max-width: 1200px)': {
    groupBody: {
      ...Mixins.profileAndGroupBodyDesktopMedium(),
    },
  },
  '@media screen and (max-width: 900px)': {
    groupBody: {
      ...Mixins.profileAndGroupBodyDesktopSmall(),
    },
  },
  '@media screen and (max-width: 750px)': {
    groupBody: {
      ...Mixins.profileAndGroupBodyTablet(),
    },
    mobileTabs: {
      ...Mixins.profileAndGroupMobileTabs(),
    },
    select: {
      width: '100%',
    },
  },
  '@media screen and (max-width: 490px)': {
    groupBody: {
      ...Mixins.profileAndGroupBodyMobile(),
    },
    membershipTag: {
      fontSize: 12,
    },
  },
  '@media screen and (max-width: 390px)': {
    groupBody: {
      ...Mixins.defaultBodyMobile(),
    },
  },
};
