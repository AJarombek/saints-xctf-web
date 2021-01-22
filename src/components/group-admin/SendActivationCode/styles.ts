/**
 * JSS styles for the SendActivationCode component.
 * @author Andrew Jarombek
 * @since 1/19/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  sendActivationCode: {},
  container: {
    ...Mixins.containerBackground()
  },
  title: {
    ...Mixins.formTitle()
  },
  inputTitle: {
    ...Mixins.inputTitle()
  },
  input: {
    width: '100%',
    maxWidth: 400
  },
  approvalMessage: {
    ...FontMixins.robotoSlab(),
    marginTop: 20,

    '& > strong': {
      ...FontMixins.robotoSlabBold()
    }
  },
  approval: {
    display: 'flex',
    alignItems: 'center',

    '& > p': {
      ...FontMixins.robotoSlab(),
      marginLeft: 10
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    '& button': {
      display: 'flex',
      alignItems: 'center',

      '& p': {
        margin: 0
      }
    }
  },
  spinner: {
    ...Mixins.buttonSpinner()
  },
  disabledButton: {
    backgroundColor: '#f3f3f3 !important',

    '& p': {
      color: '#333 !important'
    }
  }
};
