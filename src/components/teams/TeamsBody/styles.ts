/**
 * JSS styles for the TeamsBody component.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import Mixins, { FontMixins } from '../../../styles/mixins';
import Colors from '../../../styles/colors';

export default {
  teamsBody: {
    ...Mixins.defaultBody()
  },
  title: {
    ...Mixins.formTitle()
  },
  container: {
    backgroundColor: '#E3E3E3',
    width: '100%',
    maxWidth: '700px',
    margin: '25px auto',
    borderRadius: '6px',
    padding: '20px'
  },
  teamTitle: {
    ...FontMixins.robotoBold(),
    fontSize: 20
  },
  groups: {
    marginTop: 20,
    marginBottom: 10
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: 10,
    borderRadius: 4,
    boxShadow: 'rgba(170, 170, 170, 0.2) 0px 1px 3px',
    backgroundColor: Colors.lightestBackground
    /* ❤️ */
  },
  groupTitle: {
    ...FontMixins.roboto(),
    fontSize: 18,
    margin: '15px'
  }
};
