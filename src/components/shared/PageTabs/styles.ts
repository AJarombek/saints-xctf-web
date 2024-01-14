/**
 * JSS styles for the PageTabs component.
 * @author Andrew Jarombek
 * @since 9/8/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';
import color from 'color';

export default {
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '15px auto',
    width: 150,
  },
  tab: {
    textAlign: 'center',
    ...FontMixins.robotoSlab(),
    fontSize: 16,
    cursor: 'pointer',
    color: '#555',
    transition: 'color 0.5s ease',

    '&:hover': {
      color: '#222',
    },
  },
  currentTab: {
    color: Colors.sxctfRed,
    textDecoration: 'underline',
    textDecorationThickness: 2,
    textDecorationColor: '#888',
    transition: 'color 0.5s ease, text-decoration-color 0.5s ease',

    '&:hover': {
      color: color(Colors.sxctfRed).darken(0.1).hex(),
      textDecorationColor: '#444',
    },
  },
};
