/**
 * JSS styles for the EditGroup component.
 * @author Andrew Jarombek
 * @since 1/26/2021
 */

import Mixins from '../../../styles/mixins';
import color from 'color';

export default {
  editGroup: {},
  title: {
    ...Mixins.formTitle(),
    fontSize: 20
  },
  form: {
    ...Mixins.containerBackground(),
    backgroundColor: color('#E3E3E3').alpha(0.8).string(),
    maxWidth: '900px'
  },
  inputTitle: {
    ...Mixins.inputTitle()
  },
  radioGroup: {
    display: 'flex'
  },
  radio: {
    margin: '0 20px'
  },
  textArea: {
    ...Mixins.textArea()
  },
  actions: {
    ...Mixins.formActions()
  },
  submitButton: {
    ...Mixins.submitButton()
  },
  cancelButton: {
    marginRight: 10
  },
  disabledSubmitButton: {
    ...Mixins.disabledButton(),
    backgroundColor: '#d6d6d6 !important'
  },
  buttonSpinner: {
    ...Mixins.buttonSpinner()
  }
};
