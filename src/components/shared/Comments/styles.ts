/**
 * JSS styles for the Comments component.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import color from 'color';
import Colors, {FeelColors} from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    comments: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    newCommentForm: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    newComment: {
        margin: '0 2%',
        padding: '6px 4px',
        height: '35px',
        backgroundColor: '#fdfdfd',
        border: ({feel}: {feel: number}) => `2px solid ${color(FeelColors[feel - 1]).darken(0.20).hex()}`,
        borderRadius: '5px',
        ...FontMixins.roboto(),
        fontSize: '14px',
        resize: 'none',

        '&:focus': {
            outline: 'none',
        }
    },
    focusNewComment: {
        width: 'calc(100% - 70px)',
    },
    blurNewComment: {
        width: '100%',
    },
    newCommentDisabled: {
        backgroundColor: '#eee',
    },
    addIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '50%',
        border: 'none',
        backgroundColor: Colors.spotPaletteBlue,
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.4s ease, background-color 0.2s ease',
        color: 'white',
        cursor: 'pointer',
        height: 30,
        width: 30,

        '&:hover': {
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        },

        '&:active': {
            backgroundColor: color(Colors.spotPaletteBlue).darken(0.2).hex(),
        },

        '&:focus': {
            outline: 'none',
        },

        '& > p': {
            ...FontMixins.elegantIcons(),
            fontSize: 24,
            margin: 0,
            textAlign: 'center',
        },
    },
    addIconDisabled: {
        backgroundColor: '#ddd',

        '&:hover': {
            boxShadow: 'none',
        },
    },
    commentList: {
        display: 'flex',
        margin: '10px 0 0 0',
        width: '100%',
        flexDirection: 'column',
    },
    comment: {
        width: '100%',
        borderTop: '1px solid #AAA',
        paddingTop: '2px',
        paddingBottom: '8px',
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    titleLink: {
        ...FontMixins.robotoSlab(),
        color: '#333',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    date: {
        ...FontMixins.robotoBold(),
        fontSize: '14px',
        margin: '0 0 0 auto',
    },
    commentBody: {
        margin: '5px 0',
        display: 'inline-block',
        ...FontMixins.robotoBold(),
        fontSize: '14px',

        '& > a': {
            display: 'inline-block',
            ...FontMixins.robotoBold(),
            color: '#444',
            transition: 'color 0.4s ease',

            '&:hover': {
                color: color(Colors.spotPaletteBrown).darken(0.2).hex(),
            }
        }
    },
};
