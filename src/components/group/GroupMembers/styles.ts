/**
 * JSS styles for the GroupMembers component.
 * @author Andrew Jarombek
 * @since 1/10/2021
 */

import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
  container: {
    marginTop: 20,
    cursor: 'pointer'
  },
  member: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground,

    '& > p:nth-child(1)': {
      ...FontMixins.robotoSlab(),
      marginLeft: 20
    },

    '& > p:nth-child(2)': {
      ...FontMixins.robotoBold(),
      margin: '0 20px 0 auto',
      fontSize: 14
    }
  }
};
