/**
 * JSS styles for the PaginationBar component.
 * @author Andrew Jarombek
 * @since 7/25/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  paginationBar: {
    ...FontMixins.robotoBold(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0'
  },
  page: {
    cursor: 'pointer',
    padding: '0 12px'
  },
  otherPage: {
    color: '#aaa',
    fontSize: '24px',
    transition: 'color 0.3s ease',

    '&:hover': {
      color: Colors.spotPaletteBrown,
      textDecoration: 'underline',
      textDecorationColor: '#aaa'
    }
  },
  currentPage: {
    color: Colors.sxctfRed,
    fontSize: '28px'
  },
  spread: {
    color: '#aaa',
    fontSize: '24px'
  }
};
