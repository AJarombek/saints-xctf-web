/**
 * JSS styles for the Alert component.
 * @author Andrew Jarombek
 * @since 1/14/2021
 */

import { AlertType } from './Alert';
import color from 'color';
import Colors from '../../../styles/colors';
import { FontMixins } from '../../../styles/mixins';

export default {
  alert: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderRadius: 3,
    backgroundColor: ({ type }: { type: AlertType }): string =>
      type === 'warning'
        ? color(Colors.statusWarning).lighten(0.65).hex()
        : type === 'info'
        ? color(Colors.spotPaletteBlue).lighten(0.65).hex()
        : type === 'success'
        ? color(Colors.statusSuccess).lighten(1.1).hex()
        : color(Colors.statusFailure).lighten(0.65).hex(),
  },
  alertIcon: {
    ...FontMixins.elegantIcons(),
    fontSize: 28,
    margin: '10px 25px',
    color: ({ type }: { type: AlertType }): string =>
      type === 'warning'
        ? Colors.statusWarning
        : type === 'info'
        ? Colors.spotPaletteBlue
        : type === 'success'
        ? Colors.statusSuccess
        : Colors.statusFailure,
  },
  message: {
    ...FontMixins.roboto(),
    fontSize: 16,
    margin: '5px 10px 5px 0',
  },
  closeIcon: {
    ...FontMixins.elegantIcons(),
    fontSize: 24,
    margin: '0 10px 0 auto',
    cursor: 'pointer',
  },
  '@media screen and (max-width: 1000px)': {
    alertIcon: {
      margin: 10,
    },
    message: {
      // Pfizer #2 ✅
      margin: 0,
    },
  },
  '@media screen and (max-width: 650px)': {
    message: {
      fontSize: 14,
    },
  },
};
