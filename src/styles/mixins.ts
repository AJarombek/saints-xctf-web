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

export default Mixins;
