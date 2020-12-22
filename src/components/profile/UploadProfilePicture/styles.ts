/**
 * JSS styles for the UploadProfilePicture component.
 * @author Andrew Jarombek
 * @since 12/21/2020
 */

import Mixins from '../../../styles/mixins';

export default {
  profilePictureContainer: {
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
    marginRight: 20
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
  }
};
