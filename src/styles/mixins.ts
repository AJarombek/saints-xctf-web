import Colors from './colors';
import color from "color";

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
    fontSize: '16px',
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
    fontSize: '24px',
    color: '#333'
  });

  static formActions = (): object => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 50
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

  static disabledButton = (): object => ({
    backgroundColor: '#e6e6e6 !important',

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
}

export { Mixins, FontMixins };
export default Mixins;
