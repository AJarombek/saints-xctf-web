/**
 * JSS styles for the UploadFile component.
 * I am always here for you.  I am always a text or call away ❤️.
 * @author Andrew Jarombek
 * @since 11/20/2020
 */

import Colors from '../../../styles/colors';
import color from 'color';
import { FontMixins } from '../../../styles/mixins';

export default {
  uploadFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 40px',
    cursor: 'pointer',
    width: 420,
    height: 150,
    borderRadius: 4
  },
  uploadFileBoxDrag: {
    border: `2px dashed ${color(Colors.spotPaletteBrown).darken(0.2).hex()}`
  },
  uploadFileBoxEmpty: {
    border: `2px dashed ${Colors.spotPaletteBrown}`
  },
  hiddenInput: {
    display: 'none'
  },
  uploadText: {
    ...FontMixins.robotoSlabThin(),
    fontSize: 16
  },
  uploadTextDrag: {
    color: color(Colors.spotPaletteBrown).darken(0.2).hex()
  },
  uploadTextEmpty: {
    color: Colors.spotPaletteBrown
  },
  '@media screen and (max-width: 950px)': {
    uploadFile: {
      width: 'auto'
    }
  },
  '@media screen and (max-width: 840px)': {
    uploadFile: {
      width: 420
    }
  },
  '@media screen and (max-width: 450px)': {
    uploadFile: {
      width: 'auto'
    }
  }
};
