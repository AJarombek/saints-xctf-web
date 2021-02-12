/**
 * JSS styles for the UploadedFile component.
 * @author Andrew Jarombek
 * @since 2/10/2021
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  uploadedFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 420,
    height: 150,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',

    '& > p': {
      ...FontMixins.robotoSlabBold(),
      fontSize: 20,
      margin: 0,
      paddingBottom: 5
    }
  },
  removeIcon: {},
  uploadStatus: {},
  uploadPercentage: {},
  uploadFailed: {}
};
