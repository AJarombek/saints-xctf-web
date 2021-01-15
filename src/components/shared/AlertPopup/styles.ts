/**
 * JSS styles for the AlertPopup component.
 * @author Andrew Jarombek
 * @since 8/8/2020
 */

export default {
  alertContainer: {
    display: 'flex',
    position: 'fixed',
    top: 100,
    left: 0,
    width: '100%',
    justifyContent: 'center',

    '& > div': {
      width: '80%',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      position: 'absolute'
    }
  }
};
