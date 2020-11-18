/**
 * JSS mixins reused throughout the application.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

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

  static centeredBody = (): object => ({});
  static formTitle = (): object => ({});
  static formSubtitle = (): object => ({});
  static formError = (): object => ({});
  static formButtons = (): object => ({});
}

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

export { Mixins, FontMixins };
export default Mixins;
