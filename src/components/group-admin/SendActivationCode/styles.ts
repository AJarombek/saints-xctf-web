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
  },
  '@media screen and (max-width: 1050px)': {
    title: {
      width: '100%'
    }
  },
  '@media screen and (max-width: 450px)': {
    title: {
      fontSize: 20
    },
    approvalMessage: {
      fontSize: 14
    },
    approval: {
      '& > p': {
        fontSize: 14
      }
    }
  },
  '@media screen and (max-width: 390px)': {
    title: {
      marginLeft: 15,
      width: 'auto'
    }
  }
};
