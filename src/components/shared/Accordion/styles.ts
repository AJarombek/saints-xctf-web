/**
 * JSS styles for the Accordion component.
 * @author Andrew Jarombek
 * @since 8/9/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
    border: '1px solid #bbb',
    borderRadius: '3px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
  },
  icon: {
    ...FontMixins.elegantIcons(),
    margin: '0 10px',
    fontSize: '20px',
  },
  title: {
    ...FontMixins.robotoSlabBold(),
    fontSize: '18px',
    color: '#444',
  },
  arrow: {
    ...FontMixins.elegantIcons(),
    margin: '0 10px 0 auto',
    fontSize: '20px',
    color: '#888',
  },
  body: {},
};
