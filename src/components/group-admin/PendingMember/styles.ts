import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

/**
 * JSS styles for the PendingMember component.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

export default {
  pendingMember: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground
  },
  pendingMemberActions: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px 0 auto',

    '& > div': {
      padding: '5px 10px',
      display: 'flex'
    }
  },
  name: {
    ...FontMixins.robotoSlab(),
    fontSize: 16,
    marginLeft: 15
  },
  '@media screen and (max-width: 450px)': {
    name: {
      fontSize: 14
    },
    pendingMemberActions: {
      '& button': {
        fontSize: 12
      }
    }
  }
};
