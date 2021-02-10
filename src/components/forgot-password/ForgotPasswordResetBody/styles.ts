/**
 * JSS styles for the ForgotPasswordResetBody component.
 * You help me so much.  Love & miss you.
 * @author Andrew Jarombek
 * @since 2/6/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';

export default {
  link: {
    ...Mixins.blueLink(),
    marginTop: 15
  },
  inputTip: {
    ...FontMixins.robotoSlab(),
    color: '#777',
    width: 325,
    fontSize: 12,
    margin: '10px 5px 20px 5px'
  },
  checkedIcon: {
    ...Mixins.checkedIcon()
  },
  successDescription: {
    ...Mixins.successDescription()
  },
  signIn: {
    ...Mixins.blueLink()
  },
  '@media screen and (max-width: 1000px)': {
    inputTip: {
      width: 250,
      fontSize: 10
    }
  }
};
