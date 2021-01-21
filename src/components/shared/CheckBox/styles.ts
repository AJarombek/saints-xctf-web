/**
 * JSS styles for the CheckBox component.
 * @author Andrew Jarombek
 * @since 1/20/2021
 */

export default {
  checkBox: {},
  input: {
    display: 'none',

    '& + span': {
      border: '1px solid #BBB',
      width: 12,
      height: 12
    },

    '&:checked + span': {}
  }
};
