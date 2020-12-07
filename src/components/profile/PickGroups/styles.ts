/**
 * JSS styles for the PickGroups component.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  pickGroups: {},
  group: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px'
  },
  groupTitle: {
    ...FontMixins.roboto(),
    marginLeft: 15
  },
  groupActionIcon: {
    margin: '0 15px 0 auto',

    '& > button > p': {
      ...FontMixins.elegantIcons()
    }
  }
};
