/**
 * JSS styles for the PickGroup component.
 * @author Andrew Jarombek
 * @since 12/7/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  group: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: ({ status }: { status: string }): string =>
      status === 'accepted'
        ? Colors.sxctfRed
        : status === 'pending'
        ? Colors.spotPaletteBrown
        : Colors.lightestBackground,
    color: ({ status }: { status: string }): string => (status ? '#FFF' : '#000')
  },
  groupTitle: {
    ...FontMixins.roboto(),
    marginLeft: 15
  },
  groupActionIcon: {
    margin: '0 15px 0 auto',

    '&:active': {
      backgroundColor: 'transparent !important'
    },

    '& > button > p': {
      ...FontMixins.elegantIcons(),
      color: ({ status }: { status: string }): string => (status ? '#FFF' : '#000')
    }
  }
};
