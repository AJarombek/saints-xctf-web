/**
 * JSS mixins reused throughout the application.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

class Mixins {
    static lightNavDarkDropdown = () => ({
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

    static centeredBody = () => ({});
    static formTitle = () => ({});
    static formSubtitle = () => ({});
    static formError = () => ({});
    static formButtons = () => ({});
}

class FontMixins {
    static longway = () => ({
        fontFamily: "'Longway', Helvetica, sans-serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });

    static allura = () => ({
        fontFamily: "'Allura', Helvetica, sans-serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });

    static elegantIcons = () => ({
        fontFamily: "'ElegantIcons', Helvetica, sans-serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });

    static robotoBold = () => ({
        fontFamily: "'Roboto-Bold', Helvetica, sans-serif !important",
        fontWeight: 'bold',
        fontStyle: 'normal'
    });

    static roboto = () => ({
        fontFamily: "'Roboto-Regular', Helvetica, sans-serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });

    static robotoThin = () => ({
        fontFamily: "'Roboto-Thin', Helvetica, sans-serif !important",
        fontWeight: 'lighter',
        fontStyle: 'normal'
    });

    static robotoSlabBold = () => ({
        fontFamily: "'RobotoSlab-Bold', Helvetica, serif !important",
        fontWeight: 'bold',
        fontStyle: 'normal'
    });

    static robotoSlab = () => ({
        fontFamily: "'RobotoSlab-Regular', Helvetica, serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });

    static robotoSlabLight = () => ({
        fontFamily: "'RobotoSlab-Light', Helvetica, serif !important",
        fontWeight: 'lighter',
        fontStyle: 'normal'
    });

    static robotoSlabThin = () => ({
        fontFamily: "'RobotoSlab-Thin', Helvetica, serif !important",
        fontWeight: 'normal',
        fontStyle: 'normal'
    });
}

export {Mixins, FontMixins};
export default Mixins;
