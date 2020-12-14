/**
 * JSS styles for the PickTeams component.
 * @author Andrew Jarombek
 * @since 12/4/2020
 */

import { FontMixins } from '../../../styles/mixins';

export default {
  pickTeams: {},
  search: {
    padding: 10,

    '& > div:nth-child(1)': {
      width: '65%'
    },

    '& > div:nth-child(2)': {
      width: '100%'
    }
  },
  successfulSearch: {
    backgroundColor: '#DDD'
  },
  searchedTeams: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0'
  },
  searchedTeam: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 10px',
    margin: 6,
    borderRadius: 4,
    backgroundColor: '#CCC',
    cursor: 'pointer',

    '& > p:nth-child(1)': {
      ...FontMixins.robotoSlabThin(),
      margin: 0
    },

    '& > p:nth-child(2)': {
      ...FontMixins.elegantIcons(),
      margin: '0 0 0 4px',
      color: '#990000'
    }
  }
};
