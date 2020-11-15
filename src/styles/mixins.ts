/**
 * JSS mixins reused throughout the application.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

class Mixins {
  static lightNavDarkDropdown = (): object => ({
    '& .sxctf-nav-bar-dropdown-visible': {
      backgroundColor: '#131313',

      '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
        backgroundColor: 'white'
      }
    },
    '@media screen and (min-width: 800px)': {
      '& .sxctf-nav-bar-dropdown-visible': {
        backgroundColor: 'transparent'
      }
    },
    '& .sxctf-nav-bar-dropdown-hidden': {
      backgroundColor: '#f5f5f5',

      '& h1': {
        color: '#282828'
      },

      '& .aj-mobile-hamburger span, & .aj-mobile-hamburger span:before, & .aj-mobile-hamburger span:after': {
        backgroundColor: 'black'
      }
    },
    '& .sxctf-nav-bar .aj-text-button > button, .sxctf-nav-bar .aj-outlined-button > button': {
      color: '#555 !important',

      '&:hover': {
        color: '#0e0e0e !important'
      }
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
