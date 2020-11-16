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
      fontSize: 20
    },

    '&.sxctf-nav-bar-dropdown-hidden h1': {
      color: '#282828'
    },

    '&.sxctf-nav-bar-dropdown-visible h1': {
      color: 'white'
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
      backgroundColor: 'black',
      width: '25px',
      height: '3px'
    },

    '& .aj-mobile-hamburger': {
      padding: '16px 0',

      '& span:before': {
        top: '-8px'
      },

      '& span:after': {
        top: '8px'
      }
    }
  },
  dry: {
    position: 'absolute',

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
      width: 30,
      height: 4
    },

    '& .aj-mobile-hamburger': {
      width: 30,
      padding: '15px 4px'
    },

    '& .aj-mobile-hamburger button span:before': {
      top: -10
    },

    '& .aj-mobile-hamburger button span:after': {
      top: 10
    }
  },
  stickyDropdown: {
    '&.sxctf-nav-dropdown-visible': {
      top: 55,
      animationName: '$show-background-sticky'
    }
  },
  dryDropdown: {
    '&.sxctf-nav-dropdown-visible': {
      top: 100,
      animationName: '$show-background'
    }
  },
  '@media screen and (max-width: 390px)': {
    dry: {
      '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
        width: 25,
        height: 3
      },

      '& .aj-mobile-hamburger': {
        width: 25,
        padding: '10px 2px'
      },

      '& .aj-mobile-hamburger button span:before': {
        top: -8
      },

      '& .aj-mobile-hamburger button span:after': {
        top: 8
      }
    },
    dryDropdown: {
      '&.sxctf-nav-dropdown-visible': {
        top: 75,
        animationName: '$show-background-mobile'
      }
    }
  },
  '@keyframes show-background': {
    from: {
      height: 0
    },
    to: {
      height: 'calc(100vh - 100px)'
    }
  },
  '@keyframes show-background-mobile': {
    from: {
      height: 0
    },
    to: {
      height: 'calc(100vh - 75px)'
    }
  },
  '@keyframes show-background-sticky': {
    from: {
      height: 0
    },
    to: {
      height: 'calc(100vh - 55px)'
    }
  }
};
