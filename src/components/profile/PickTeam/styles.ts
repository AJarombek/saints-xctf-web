/**
 * JSS styles for the PickTeam component.
 * @author Andrew Jarombek
 * @since 12/5/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  team: {},
  teamTitleHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    ...FontMixins.robotoSlab(),
    fontSize: 18
  },
  memberTag: {
    ...FontMixins.robotoThin(),
    fontSize: 14,
    marginLeft: 20,
    backgroundColor: ({ status }: { status: string }): string =>
      status === 'accepted'
        ? `${Colors.sxctfRed} !important`
        : status === 'pending'
        ? `${Colors.spotPaletteBrown} !important`
        : `${Colors.lightBackground} !important`,
    color: ({ status }: { status: string }): string => (status ? '#FFF' : '#000')
  }
};
