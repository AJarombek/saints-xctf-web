/**
 * JSS styles for the EditProfile component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import color from 'color';
import Mixins from '../../../styles/mixins';

export default {
  editProfile: {},
  title: {
    ...Mixins.formTitle(),
    fontSize: 20
  },
  form: {
    ...Mixins.containerBackground(),
    backgroundColor: color('#E3E3E3').alpha(0.8).string(),
    maxWidth: '900px'
  },
  inputError: {
    ...Mixins.inputError()
  },
  inputTitle: {
    ...Mixins.inputTitle()
  },
  twoInputs: {
    display: 'flex'
  },
  textArea: {
    ...Mixins.textArea()
  },
  radioGroup: {
    display: 'flex'
  },
  radio: {
    margin: '0 20px'
  },
  firstNameInput: {
    ...Mixins.rightInput(50)
  },
  lastNameInput: {
    ...Mixins.leftInput(50)
  },
  emailInput: {
    ...Mixins.rightInput(80)
  },
  classYearInput: {
    ...Mixins.leftInput(20),

    '& input': {
      width: 'auto'
    }
  },
  locationInput: {
    ...Mixins.rightInput(50)
  },
  favoriteEventInput: {
    ...Mixins.leftInput(50)
  },
  actions: {
    ...Mixins.formActions()
  },
  submitButton: {
    marginRight: 20
  },
  cancelButton: {
    marginRight: 10
  },
  '@media screen and (max-width: 720px)': {
    title: {
      width: 'auto'
    }
  }
};
