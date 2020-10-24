/**
 * JSS styles for the MonthlyCalendar component.
 * @author Andrew Jarombek
 * @since 10/18/2020
 */

import {FontMixins} from "../../../styles/mixins";

export default {
    monthlyCalendar: {},
    filters: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterTitle: {
        ...FontMixins.robotoSlab(),
        margin: '30px 40px 30px 0'
    },
    filterButtons: {},
    '@media screen and (max-width: 900px)': {
        filterTitle: {
            margin: '20px 20px 20px 0'
        }
    },
    '@media screen and (max-width: 800px)': {
        filterButtons: {
            '& .aj-contained-button': {
                padding: '5px 10px'
            },
            '& .aj-outlined-button': {
                padding: '3px 10px'
            },
            '& button': {
                fontSize: 12
            }
        }
    }
};