/**
 * JSS styles for the AutoResizeTextArea component.
 * @author Andrew Jarombek
 * @since 8/30/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  textArea: {
    padding: '6px 4px',
    height: '35px',
    backgroundColor: '#fdfdfd',
    border: '2px solid #bbb',
    borderRadius: '5px',
    ...FontMixins.roboto(),
    fontSize: '14px',
    resize: 'none',

    '&:focus': {
      outline: 'none',
    },
  },
};
