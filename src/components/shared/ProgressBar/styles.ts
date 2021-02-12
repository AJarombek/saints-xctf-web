/**
 * JSS styles for the ProgressBar component.
 * @author Andrew Jarombek
 * @since 2/11/2021
 */

import Colors from '../../../styles/colors';

type StyleProps = {
  progress: number;
  inProgress: boolean;
};

export default {
  progressBar: {
    position: 'relative'
  },
  bar: {
    position: 'absolute',
    height: 16,
    margin: '4px 0'
  },
  barFull: {
    backgroundColor: Colors.lightBackground,
    width: '100%'
  },
  barProgress: {
    backgroundColor: (props: StyleProps): string => (props.progress >= 100 ? Colors.sxctfRed : Colors.spotPaletteBrown),
    width: (props: StyleProps): string => `${Math.min(props.progress, 100)}`,
    backgroundImage: (props: StyleProps): string =>
      props.inProgress
        ? `
        linear-gradient(
          -45deg,
          rgba(255,255,255,.15) 25%, transparent 25%,
          transparent 50%, rgba(255,255,255,.15) 50%,
          rgba(255,255,255,.15) 75%, transparent 75%,
          transparent
        )
    `
        : 'none',
    backgroundSize: '2rem'
  }
};
