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
    borderRadius: '3px',
    backgroundColor: ({ type }: { type: AlertType }): string =>
      type === 'warning'
        ? color(Colors.statusWarning).lighten(0.65).hex()
        : type === 'info'
        ? color(Colors.spotPaletteBlue).lighten(0.65).hex()
        : color(Colors.statusFailure).lighten(0.65).hex()
  },
  alertIcon: {
    ...FontMixins.elegantIcons(),
    fontSize: '28px',
    margin: '10px',
    color: ({ type }: { type: AlertType }): string =>
      type === 'warning' ? Colors.statusWarning : type === 'info' ? Colors.spotPaletteBlue : Colors.statusFailure
  },
  message: {
    ...FontMixins.roboto(),
    fontSize: '16px',
    margin: 0
  },
  closeIcon: {
    ...FontMixins.elegantIcons(),
    fontSize: '24px',
    margin: '0 10px 0 auto',
    cursor: 'pointer'
  }
};
