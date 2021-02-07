/**
 * JSS styles for the NotFound component.
 * @author Andrew Jarombek
 * @since 9/5/2020
 */

import { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackground,
    margin: '0 6%'
  },
  fullPageContainer: {
    minHeight: 'calc(100vh - 100px)',
    marginTop: 100
  },
  logo: {
    height: 150,
    width: 150
  },
  title: {
    ...FontMixins.longway(),
    fontSize: 32
  },
  description: {
    ...FontMixins.robotoSlabThin(),
    fontSize: 18
  }
};
