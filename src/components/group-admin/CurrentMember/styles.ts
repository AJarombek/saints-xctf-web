/**
 * JSS styles for the CurrentMember component.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
  currentMember: {},
  memberTypeTag: {
    fontSize: 14,
    marginLeft: 20,
    cursor: 'auto !important',
    backgroundColor: ({ user }: { user: string }): string =>
      user === 'admin' ? Colors.sxctfRed : Colors.lightBackground,
    color: ({ user }: { user: string }): string => (user === 'admin' ? '#FFF' : '#000')
  },
  memberTypeContent: {
    ...FontMixins.robotoThin(),
    display: 'flex',
    alignItems: 'center',
    padding: '1px 0'
  }
};
