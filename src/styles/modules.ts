/**
 * JSS modules (groupings of mixins) reused throughout the application.
 * @author Andrew Jarombek
 * @since 12/17/2020
 */

import Mixins, { FontMixins } from './mixins';
import { Styles } from 'react-jss';

export class Modules {
  static membershipModal = (): Styles<'body' | 'title' | 'buttons'> => ({
    body: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 40px'
    },
    title: {
      display: 'flex',
      flexDirection: 'column',

      '& > p': {
        ...FontMixins.robotoSlab(),

        '& b': {
          ...FontMixins.robotoSlabBold()
        }
      }
    },
    buttons: {
      ...Mixins.modalButtons(),

      '& > .aj-contained-button': {
        marginRight: 10
      }
    }
  });

  static filters = (): Styles<'filters' | 'filterTitle' | '@media screen and (max-width: 900px)'> => ({
    filters: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    filterTitle: {
      ...FontMixins.robotoSlab(),
      margin: '30px 40px 30px 0'
    },
    '@media screen and (max-width: 900px)': {
      filterTitle: {
        margin: '20px 20px 20px 0'
      }
    }
  });
}
