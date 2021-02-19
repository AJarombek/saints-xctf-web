import Colors from './colors';
import color from 'color';

/**
 * JSS mixins reused throughout the application.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

class FontMixins {
  static longway = (): object => ({
    fontFamily: "'Longway', Helvetica, sans-serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });

  static allura = (): object => ({
    fontFamily: "'Allura', Helvetica, sans-serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });

  static elegantIcons = (): object => ({
    fontFamily: "'ElegantIcons', Helvetica, sans-serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });

  static robotoBold = (): object => ({
    fontFamily: "'Roboto-Bold', Helvetica, sans-serif !important",
    fontWeight: 'bold',
    fontStyle: 'normal'
  });

  static roboto = (): object => ({
    fontFamily: "'Roboto-Regular', Helvetica, sans-serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });

  static robotoThin = (): object => ({
    fontFamily: "'Roboto-Thin', Helvetica, sans-serif !important",
    fontWeight: 'lighter',
    fontStyle: 'normal'
  });

  static robotoSlabBold = (): object => ({
    fontFamily: "'RobotoSlab-Bold', Helvetica, serif !important",
    fontWeight: 'bold',
    fontStyle: 'normal'
  });

  static robotoSlab = (): object => ({
    fontFamily: "'RobotoSlab-Regular', Helvetica, serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });

  static robotoSlabLight = (): object => ({
    fontFamily: "'RobotoSlab-Light', Helvetica, serif !important",
    fontWeight: 'lighter',
    fontStyle: 'normal'
  });

  static robotoSlabThin = (): object => ({
    fontFamily: "'RobotoSlab-Thin', Helvetica, serif !important",
    fontWeight: 'normal',
    fontStyle: 'normal'
  });
}

class Mixins {
  static lightNavTheme = (): object => ({
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
  });

  static darkNavTheme = (): object => ({
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
  });

  static transparentNavTheme = (): object => ({
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
  });

  static inputError = (): object => ({
    '& .sxctf-image-input': {
      border: `2px solid ${Colors.statusFailure}`
    }
  });

  static inputTitle = (): object => ({
    ...FontMixins.robotoSlabBold(),
    fontSize: 16,
    color: Colors.spotPaletteBrown
  });

  static rightInput = (widthPercentage: number): object => ({
    flexBasis: `${widthPercentage}%`,
    paddingRight: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  });

  static leftInput = (widthPercentage: number): object => ({
    flexBasis: `${widthPercentage}%`,
    paddingLeft: 10,

    '& .sxctf-image-input': {
      width: '100%'
    }
  });

  static formTitle = (): object => ({
    ...FontMixins.robotoSlabBold(),
    width: 700,
    margin: '50px auto 0 auto',
    fontSize: 24,
    color: '#333'
  });

  static formActions = (): object => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 50
  });

  static textArea = (): object => ({
    border: 'none',
    width: '100%',
    padding: '6px 20px'
  });

  static profilePicture = (): object => ({
    width: 150,
    height: 150,
    borderRadius: '50%',
    backgroundColor: Colors.spotPaletteCream,
    border: '3px solid #888',
    transition: 'border 0.5s ease',

    '&:hover': {
      border: '3px solid #333'
    },

    '& > img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%'
    }
  });

  static modal = (): object => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 40px',

    '& > p': {
      ...FontMixins.robotoSlab(),
      fontSize: 18,

      '& b': {
        ...FontMixins.robotoSlabBold()
      }
    }
  });

  static modalButtons = (): object => ({
    display: 'flex',
    marginLeft: 'auto',
    marginTop: 20,

    '& button': {
      display: 'flex',
      alignItems: 'center'
    },

    '& > .aj-contained-button, & > .aj-outlined-button, & > .aj-text-button': {
      '& p': {
        margin: 0
      }
    }
  });

  static saintsXCTFLink = (): object => ({
    ...FontMixins.robotoSlabBold(),
    textDecoration: 'none',
    color: '#777',
    transition: 'color 0.5s ease',

    '&:hover': {
      color: Colors.sxctfRed,
      textDecoration: 'underline'
    }
  });

  static submitButton = (): object => ({
    marginRight: 20,

    '& p': {
      margin: 0
    }
  });

  static disabledButton = (): object => ({
    backgroundColor: '#e6e6e6 !important',

    '& > button': {
      display: 'flex',
      alignItems: 'center'
    },

    '& p': {
      color: '#555'
    }
  });

  static buttonSpinner = (): object => ({
    marginLeft: 25,
    marginRight: 10,

    '&:before': {
      border: `solid 4px ${color(Colors.spotPaletteBrown).lighten(0.75).hex()}`,
      borderTopColor: Colors.spotPaletteBrown
    }
  });

  static defaultPage = (): object => ({
    backgroundColor: Colors.lightBackground,

    '& .sxctf-home-footer': {
      backgroundColor: Colors.lightBackground
    }
  });

  static defaultBody = (): object => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: Colors.lightBackground,
    margin: '100px 6% 0 6%'
  });

  static profileAndGroupBody = (): object => ({
    ...Mixins.defaultBody(),
    flexDirection: 'row',
    margin: '100px 4% 0 4%',

    '& > aside': {
      flexBasis: '20%',
      marginRight: 40
    },

    '& > section': {
      flexBasis: '80%',
      margin: '0 20px'
    }
  });

  static containerBackground = (): object => ({
    backgroundColor: '#E3E3E3',
    width: '100%',
    maxWidth: '700px',
    margin: '25px auto',
    borderRadius: '6px',
    padding: '20px'
  });

  static blueLink = (): object => ({
    ...FontMixins.robotoBold(),
    fontSize: 14,
    textDecoration: 'none',
    color: Colors.spotPaletteBlue,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline'
    }
  });

  static checkedIcon = (): object => ({
    width: 50,
    height: 50,
    backgroundColor: Colors.statusSuccess,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > p': {
      ...FontMixins.elegantIcons(),
      margin: 0,
      color: '#FFF',
      fontSize: 36,
      marginTop: 6
    }
  });

  static successDescription = (): object => ({
    /* !important needed due to legacy Sass styles */
    marginTop: '15px !important',
    fontSize: '18px !important',
    textAlign: 'center',
    maxWidth: 400
  });

  static loadingContainer = (): object => ({
    width: 125,
    margin: '0 auto',

    '& .aj-loading-circle': {
      width: 30,
      height: 30,
      backgroundColor: Colors.sxctfRed
    }
  });
}

class AJComponentMixins {
  static ajSelect = (): object => ({
    position: 'relative',

    '&.aj-select-open > div': {
      borderRadius: '5px 5px 0 0'
    },

    '&.aj-select-closed > div': {
      borderRadius: 5
    },

    '& > div': {
      backgroundColor: Colors.lightestBackground,
      height: 50,
      border: 'none',
      width: '100%',
      padding: 10,
      cursor: 'pointer',

      '& > div:nth-child(1)': {
        ...FontMixins.roboto(),
        fontSize: 14
      },

      '& > div:nth-child(2)': {
        marginLeft: 'auto'
      }
    },

    '& > ul': {
      width: '100%',
      zIndex: 1,

      '& > li': {
        ...FontMixins.roboto(),
        fontSize: 14,
        textAlign: 'left',
        paddingLeft: 10
      },

      '& > li:nth-child(odd)': {
        backgroundColor: Colors.lightBackground
      },

      '& > li:nth-child(even)': {
        backgroundColor: Colors.lightestBackground
      }
    }
  });
}

export { Mixins, FontMixins, AJComponentMixins };
export default Mixins;
