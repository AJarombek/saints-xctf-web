/**
 * JSS styles for the NavBar component.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import Colors from '../../../styles/colors';
import color from 'color';

export default {
  sticky: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottom: `2px solid ${color(Colors.spotPaletteBrown).darken(0.2)}`,
    backgroundColor: '#f5f5f5',

    '& .sxctf-logo': {
      height: 55,
      width: 75
    },

    '& h1': {
      color: '#282828',
      fontSize: 20
    },

    '& .aj-text-button > button, & .aj-outlined-button > button': {
      color: '#555 !important'
    },

    '& .aj-text-button:hover, & .aj-outlined-button:hover': {
      '& > button': {
        color: '#0e0e0e !important'
      }
    },

    '& .aj-text-button > button, & .aj-outlined-button > button, & .aj-contained-button > button': {
      fontSize: 12
    },

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
      backgroundColor: 'black !important'
    },

    '& .aj-mobile-hamburger': {
      width: 25,
      padding: '10px 2px',

      '& span:before': {
        top: -8
      },

      '& span:after': {
        top: 8
      }
    }
  },
  dry: {
    position: 'absolute'
  }
};
