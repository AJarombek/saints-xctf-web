/**
 * JSS styles for the ForgotPasswordBody component.
 * @author Andrew Jarombek
 * @since 2/4/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  checkedIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.statusSuccess,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > p': {
      ...FontMixins.elegantIcons(),
      margin: 0,
      color: '#FFF',
      fontSize: 36,
      marginTop: 6
    }
  },
  successDescription: {
    /* !important needed due to legacy Sass styles */
    marginTop: '15px !important',
    fontSize: '18px !important',
    textAlign: 'center',
    maxWidth: 400
  },
  enterCode: {
    ...Mixins.blueLink()
  }
};
