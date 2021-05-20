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
    fontSize: 14,
    marginLeft: 20,
    cursor: 'auto !important',
    backgroundColor: ({ status }: { status: string }): string =>
      status === 'accepted' ? Colors.sxctfRed : status === 'pending' ? Colors.spotPaletteBrown : Colors.lightBackground,
    color: ({ status }: { status: string }): string => (status ? '#FFF' : '#000'),
    minWidth: ({ status }: { status: string }): string | number => (status === 'accepted' ? 150 : 'auto')
  },
  memberTagContent: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0',
    cursor: 'pointer',

    '& > p': {
      margin: 0
    },

    '& > p:nth-child(1)': {
      ...FontMixins.robotoThin()
    },

    '& > p:nth-child(2)': {
      ...FontMixins.elegantIcons(),
      marginLeft: 8
    }
  }
};
