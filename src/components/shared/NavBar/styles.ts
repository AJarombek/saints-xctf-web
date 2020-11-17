/**
 * JSS styles for the NavBar component.
 * Nothing but love for you here.
 * @author Andrew Jarombek
 * @since 10/19/2020
 */

import Colors from '../../../styles/colors';
import color from 'color';

export default {
  lightTheme: {
    backgroundColor: '#f5f5f5',

    '& h1': {
      color: '#282828'
    },

    '& .aj-text-button > button, & .aj-outlined-button > button': {
      color: '#555 !important'
    },

    '& .aj-text-button:hover, & .aj-outlined-button:hover': {
      '& > button': {
        color: '#0e0e0e !important'
      }
    },

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
      backgroundColor: 'black'
    }
  },
  darkTheme: {
    backgroundColor: '#131313',

    '& h1': {
      color: '#eee'
    },

    '& .aj-text-button > button, & .aj-outlined-button > button': {
      color: '#eee !important'
    },

    '& .aj-text-button:hover, & .aj-outlined-button:hover': {
      '& > button': {
        color: 'white !important'
      }
    },

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
      backgroundColor: 'white'
    }
  },
  transparentTheme: {
    backgroundColor: 'transparent',

    '& h1': {
      color: '#eee'
    },

    '& .aj-text-button > button, & .aj-outlined-button > button': {
      color: '#eee !important'
    },

    '& .aj-text-button:hover, & .aj-outlined-button:hover': {
      '& > button': {
        color: 'white !important'
      }
    },

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
      backgroundColor: 'white'
    }
  },
  lightDropdownTheme: {
    backgroundColor: '#f5f5f5',

    '& .aj-nav-list-item > div > div': {
      color: '#131313'
    }
  },
  darkDropdownTheme: {
    backgroundColor: '#131313',

    '& .aj-nav-list-item > div > div': {
      color: '#eee'
    }
  },
  sticky: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottom: `2px solid ${color(Colors.spotPaletteBrown).darken(0.2)}`,

    '& .sxctf-logo': {
      height: 55,
      width: 75
    },

    '& h1': {
      fontSize: 20
    },

    '& .aj-text-button > button, & .aj-outlined-button > button, & .aj-contained-button > button': {
      fontSize: 12
    },

    '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
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
