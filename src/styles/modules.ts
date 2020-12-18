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
}
