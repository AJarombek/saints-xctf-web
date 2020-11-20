/**
 * JSS styles for the RadioButton component.
 * @author Andrew Jarombek
 * @since 11/19/2020
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
  radio: {
    '& > label': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  input: {
    opacity: 0,
    width: 0,
    height: 0
  },
  customRadio: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: `2px solid ${Colors.sxctfRed}`,
    cursor: 'pointer'
  },
  customLabel: {
    ...FontMixins.roboto(),
    marginLeft: 10
  }
};
