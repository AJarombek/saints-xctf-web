/**
 * JSS styles for the EditProfile component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import color from 'color';
import Mixins from '../../../styles/mixins';

export default {
  editProfile: {},
  form: {
    backgroundColor: color('#E3E3E3').alpha(0.8).string(),
    width: '100%',
    maxWidth: '700px',
    margin: '25px auto',
    borderRadius: '6px',
    padding: '20px'
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
  firstNameInput: {
    flexBasis: '50%',
    paddingRight: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  },
  lastNameInput: {
    flexBasis: '50%',
    paddingLeft: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  }
};
