/**
 * JSS styles for the CheckBox component.
 * @author Andrew Jarombek
 * @since 1/20/2021
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
  checkBox: {
    display: 'flex',
    cursor: 'pointer',
  },
  input: {
    display: 'none',

    '& + span': {
      ...FontMixins.elegantIcons(),
      display: 'inline-block',
      border: '2px solid #999',
      borderRadius: 2,
      width: 16,
      height: 16,
      position: 'relative',

      '& > p': {
        color: '#FFF',
        position: 'absolute',
        margin: 0,
        top: -1,
        left: -3,
      },
    },

    '&:checked + span': {
      backgroundColor: Colors.sxctfRed,
      border: `2px solid ${Colors.sxctfRed}`,
    },
  },
};
