import { FontMixins } from '../../../styles/mixins';

/**
 * JSS styles for the PendingMember component.
 * @author Andrew Jarombek
 * @since 1/17/2021
 */

export default {
  pendingMember: {
    display: 'flex',
    alignItems: 'center'
  },
  pendingMemberActions: {
    margin: '0 10px 0 auto'
  },
  name: {
    ...FontMixins.robotoSlab()
  }
};
