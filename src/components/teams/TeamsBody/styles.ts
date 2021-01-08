/**
 * JSS styles for the TeamsBody component.
 * @author Andrew Jarombek
 * @since 1/6/2021
 */

import Mixins from '../../../styles/mixins';

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
  }
};
