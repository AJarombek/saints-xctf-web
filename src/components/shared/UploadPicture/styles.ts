/**
 * JSS styles for the UploadPicture component.
 * @author Andrew Jarombek
 * @since 12/21/2020
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  pictureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  picture: {
    ...Mixins.profilePicture(),
    marginLeft: 0
  },
  actions: {
    ...Mixins.formActions()
  },
  submitButton: {
    ...Mixins.submitButton()
  },
  disabledSubmitButton: {
    ...Mixins.disabledButton(),
    backgroundColor: '#d6d6d6 !important'
  },
  buttonSpinner: {
    ...Mixins.buttonSpinner()
  },
  cancelButton: {
    marginRight: 10
  },
  note: {
    marginTop: 10,

    '& > p': {
      ...FontMixins.robotoSlabThin(),
      fontSize: 14,
      paddingLeft: 20
    }
  }
};
