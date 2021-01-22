/**
 * JSS styles for the CheckBox component.
 * @author Andrew Jarombek
 * @since 1/20/2021
 */

export default {
  checkBox: {
    display: 'flex'
  },
  input: {
    display: 'none',

    '& + span': {
      display: 'inline-block',
      border: '2px solid #999',
      borderRadius: 2,
      width: 16,
      height: 16
    },

    '&:checked + span': {}
  }
};
