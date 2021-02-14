/**
 * JSS styles for the UploadedFile component.
 * @author Andrew Jarombek
 * @since 2/10/2021
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';
import color from 'color';

export default {
  uploadedFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 420,
    height: 150,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: color(Colors.spotPaletteCream).lighten(0.05).hex(),

    '& > p': {
      ...FontMixins.robotoSlabBold(),
      fontSize: 20,
      margin: 0,
      paddingBottom: 5
    }
  },
  progressSection: {
    display: 'flex',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '8px 0',
    paddingTop: 5,
    flexDirection: 'row'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    width: '80%'
  },
  removeIcon: {
    ...FontMixins.elegantIcons(),
    margin: 0,
    paddingLeft: 10,
    cursor: 'pointer',
    color: '#777',
    transition: 'color 0.4s ease',

    '&:hover': {
      color: '#000'
    }
  },
  uploadStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: '80%',

    '& > p': {
      width: '80%',
      margin: 0,
      fontSize: 14
    }
  },
  uploadPercentage: {
    ...FontMixins.roboto()
  },
  uploadFailed: {
    ...FontMixins.robotoSlabThin(),
    color: Colors.sxctfRed
  }
};
