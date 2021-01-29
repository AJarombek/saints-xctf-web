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
  }
};
