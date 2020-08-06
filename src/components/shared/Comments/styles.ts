/**
 * JSS styles for the Comments component.
 * @author Andrew Jarombek
 * @since 8/5/2020
 */

import color from 'color';
import {FeelColors} from "../../../styles/colors";
import {FontMixins} from "../../../styles/mixins";

export default {
    comments: {
        display: 'flex',
    },
    newComment: {
        margin: '0 2%',
        padding: '6px 4px',
        height: '35px',
        width: '100%',
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
    addIcon: {
        cursor: 'pointer',
    }
};
