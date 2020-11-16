/**
 * JSS styles for the LoadingSpinner component.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import Colors from '../../../styles/colors';

export default {
  '@keyframes spinner': {
    from: {
      transform: 'translate3d(-50%, -50%, 0) rotate(0deg)'
    },
    to: {
      transform: 'translate3d(-50%, -50%, 0) rotate(360deg)'
    }
  },
  spinner: {
    '&:before': {
      animation: '1.25s cubic-bezier(0.42, 0.15, 0.58, 0.85) infinite $spinner',
      border: `solid 5px ${Colors.lightBackground}`,
      borderTopColor: Colors.sxctfRed,
      borderRadius: '50%',
      content: '""',
      height: 20,
      width: 20,
      position: 'absolute',
      transform: 'translate3d(-50%, -50%, 0)',
      willChange: 'transform'
    }
  }
};
